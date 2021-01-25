import React, { useState, createRef, useEffect } from 'react';
import MapView, { Circle, EventUserLocation, LatLng, MapTypes, Polygon } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import {
  GeoFence,
  GeoFenceVariant,
  CircleGeoFence,
  PolygonGeoFence,
  GeoFenceCategory,
} from '../../types/geoFenceTypes';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { hexToRGB } from '../../theme/colors';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { getGeoFenceScoreRatio, insideGeoFences } from '../../helpers/geoFenceCalculations';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { convertToGeoFence } from '../../helpers/objectMappers';
import { useInterval } from '../../hooks/useInterval';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { durationToTimestamp, getCurrentTimestamp } from '../../helpers/dateTimeHelpers';

const { width, height } = Dimensions.get('window');

// Default location NTNU Trondheim
const defaultLocation: LatLng = {
  latitude: 63.419,
  longitude: 10.4025,
};

const getGeoFenceColor = (category: GeoFenceCategory, opacity: number) => {
  switch (category) {
    case GeoFenceCategory.EDUCATION:
      return hexToRGB(Colors.red, opacity);
    case GeoFenceCategory.CULTURE:
      return hexToRGB(Colors.green, opacity);
    case GeoFenceCategory.EXERCISE:
      return hexToRGB(Colors.blue, opacity);
    case GeoFenceCategory.SOCIAL:
      return hexToRGB(Colors.orange, opacity);
    default:
      return hexToRGB(Colors.almostBlack, opacity);
  }
};

const drawGeoFences = (geoFences: GeoFence[] | undefined) => {
  if (geoFences) {
    return geoFences.map((geoFence, index) => {
      if (geoFence.variant === GeoFenceVariant.CIRCLE) {
        const currentGeoFence = geoFence as CircleGeoFence;
        return (
          <Circle
            key={index}
            center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
            radius={currentGeoFence.radius}
            fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
            strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
            strokeWidth={1}
          />
        );
      } else if (geoFence.variant === GeoFenceVariant.POLYGON) {
        const currentGeoFence = geoFence as PolygonGeoFence;
        return (
          <Polygon
            key={index}
            coordinates={currentGeoFence.coordinates}
            fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
            strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
            strokeWidth={1}
          />
        );
      }
    });
  }
};

const TrackingScreen: React.FC = () => {
  // Map state
  const [userLocation, setUserLocation] = useState<LatLng>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [geoFences, setGeoFences] = useState<GeoFence[]>();

  // Tracking state
  const user_id = useAuthentication().user?.uid;
  const [inGeofence, setInGeoFence] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [counterRunning, setCounterRunning] = useState(false);
  const [trackingGeoFence, setTrackingGeoFence] = useState<GeoFence>();
  const [trackingStart, setTrackingStart] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

  const { error: fetchError, data: data } = useGeofencesQuery();
  const [InsertActivity, { data: response }] = useInsertActivityMutation();

  useEffect(() => {
    if (data) setGeoFences(convertToGeoFence(data));
  }, [data]);

  // Dynamic styles
  const mapTypeIconStyle = {
    fontSize: Typography.icon.fontSize,
    color: chosenMapType === 'satellite' ? Colors.blue : Colors.white,
  };
  const centreOnUserIconStyle = {
    fontSize: Typography.icon.fontSize,
    color: centreOnUser ? Colors.blue : Colors.white,
  };

  // Map event listner functions
  const toggleMapType = () =>
    chosenMapType === 'satellite' ? setChosenMapType('standard') : setChosenMapType('satellite');

  const userChange = (location: EventUserLocation) => {
    const newUserLocation: LatLng = {
      latitude: location.nativeEvent.coordinate.latitude,
      longitude: location.nativeEvent.coordinate.longitude,
    };
    setUserLocation(newUserLocation);
    setTrackingGeoFence(insideGeoFences(newUserLocation, geoFences));

    if (trackingGeoFence) {
      setInGeoFence(true);
    } else {
      setInGeoFence(false);
    }
  };

  const mapView = createRef<MapView>();
  const animateMapToUserPos = () => {
    if (userLocation) setCentreOnUser(true);
    mapView.current?.animateToRegion(
      {
        longitude: userLocation ? userLocation.longitude : defaultLocation.longitude,
        latitude: userLocation ? userLocation.latitude : defaultLocation.latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * (width / height),
      },
      1000,
    );
  };

  const startTracking = () => {
    if (inGeofence) {
      setScore(0);
      setCounterRunning(true);
      setIsTracking(true);
      setTrackingStart(getCurrentTimestamp());
    }
  };

  const stopTracking = () => {
    setCounterRunning(false);
    setIsTracking(false);

    try {
      const activity = {
        geofence_id: trackingGeoFence?.id,
        user_id: user_id,
        score: score,
        started_at: trackingStart,
        duration: durationToTimestamp(duration),
      };
      InsertActivity({
        variables: {
          activity: activity,
        },
      });
      console.log('Activity inserted to db', response);
    } catch (error) {
      console.error('Mutation error', error.message);
    }

    Alert.alert(
      'Upload complete',
      'Activity uploaded successfully!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  };
  const pauseTracking = () => {
    setCounterRunning(false);
  };

  useInterval(
    () => {
      if (trackingGeoFence) {
        setDuration(duration + 1);
        setScore(Math.round(score + 1 * getGeoFenceScoreRatio(trackingGeoFence.category)));
      }
    },
    counterRunning ? 1000 : null,
  );

  if (fetchError) {
    console.error('Error:', fetchError);
    Alert.alert('Error', fetchError.message);
  }
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapView}
          mapType={chosenMapType}
          showsUserLocation
          style={styles.mapStyle}
          onUserLocationChange={(location) => userChange(location)}
          onMapReady={animateMapToUserPos}
          onDoublePress={() => setCentreOnUser(false)}
          onPanDrag={() => setCentreOnUser(false)}>
          {drawGeoFences(geoFences)}
        </MapView>

        <View style={styles.infoContainer}>
          <TouchableOpacity style={styles.mapStyleButton} onPress={toggleMapType}>
            <FAIcon style={mapTypeIconStyle} name="globe-europe" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.centreOnUserButton} onPress={animateMapToUserPos}>
            <FAIcon style={centreOnUserIconStyle} name="crosshairs" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={{ ...Typography.bodyText, position: 'absolute', top: 15, left: 20, backgroundColor: 'black' }}>
        [InGeoFence={inGeofence ? 'true' : 'false'}] [counterRunning={counterRunning ? 'true' : 'false'}]
      </Text>
      <Text style={{ ...Typography.bodyText, position: 'absolute', top: 35, left: 20, backgroundColor: 'black' }}>
        [isTracking={isTracking ? 'true' : 'false'}] [category=
        {trackingGeoFence ? GeoFenceCategory[trackingGeoFence.category] : 'none'}]
      </Text>
      <View style={styles.trackingInfoContainer}>
        {/* Tracking */}
        {isTracking && counterRunning && (
          <View>
            <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Hovering...</Text>
            <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Score: {score.toFixed(0)}</Text>
            <ActivityIndicator size={'large'} color={Colors.blue} style={{ marginTop: Spacing.base }} />
          </View>
        )}
        {/* Tracking paused */}
        {isTracking && !counterRunning && (
          <View>
            <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Paused</Text>
            <Text style={{ ...Typography.largeBodyText }}>Resume to earn more points!</Text>
            <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Score: {score.toFixed(0)}</Text>
          </View>
        )}
        {/* Not tracking and user in geo fence */}
        {!isTracking && !counterRunning && inGeofence && (
          <Text style={{ ...Typography.headerText, textAlign: 'center' }}>Start hovering to earn points!</Text>
        )}
        {/* Not tracking and user outside geo fence */}
        {!isTracking && !counterRunning && !inGeofence && (
          <Text style={{ ...Typography.headerText, textAlign: 'center' }}>Move to hover zone to earn points!</Text>
        )}
      </View>

      {/* Tracking stopped / not started and user in geo fence */}
      {!isTracking && !counterRunning && inGeofence && (
        <View style={styles.startButtonContainer}>
          <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.green }]} onPress={startTracking}>
            <Text style={styles.trackingButtonText}>Start</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tracking paused */}
      {isTracking && !counterRunning && (
        <View style={styles.startButtonContainer}>
          <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.green }]} onPress={startTracking}>
            <Text style={styles.trackingButtonText}>Resume</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tracking */}
      {isTracking && counterRunning && (
        <View style={styles.stopButtonContainer}>
          <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.red }]} onPress={stopTracking}>
            <Text style={styles.trackingButtonText}>Stop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.trackingButton, { backgroundColor: Colors.gray800 }]}
            onPress={pauseTracking}>
            <Text style={styles.trackingButtonText}>Pause</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackingInfoContainer: {
    height: '20%',
    padding: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  mapStyle: {
    width: '98%',
    height: '95%',
    borderRadius: Spacing.smaller,
  },
  infoContainer: {
    position: 'absolute',
    top: '6%',
    right: '2%',
  },
  mapStyleButton: {
    ...Buttons.iconButton,
    backgroundColor: Colors.almostBlack,
  },
  centreOnUserButton: {
    ...Buttons.iconButton,
    backgroundColor: Colors.almostBlack,
    marginTop: Spacing.smallest,
  },
  startButtonContainer: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stopButtonContainer: {
    height: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Spacing.extraLarge,
    marginRight: Spacing.extraLarge,
  },
  trackingButton: {
    padding: Spacing.smallest,
    borderRadius: 50,
    width: 100,
    height: 100,
    margin: Spacing.base,
    justifyContent: 'center',
  },
  trackingButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
  icon: {
    fontSize: Typography.icon.fontSize,
    color: Colors.blue,
  },
});

export default TrackingScreen;
