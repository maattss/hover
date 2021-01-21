import React, { useState, createRef, useEffect } from 'react';
import MapView, { Circle, EventUserLocation, LatLng, MapTypes, Polygon } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Alert } from 'react-native';
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
import { insideGeoFences } from '../../helpers/geoFenceCalculations';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { convertToGeoFence } from '../../helpers/objectMappers';
import { useInterval } from '../../hooks/useInterval';

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
  const [userLocation, setUserLocation] = useState<LatLng>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [inGeofence, setInGeoFence] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingCategory, setTrackingCategory] = useState<GeoFenceCategory>();
  const [counterRunning, setCounterRunning] = useState(false);
  const [geoFences, setGeoFences] = useState<GeoFence[]>();
  const [score, setScore] = useState(0);

  const { error: fetchError, data: data } = useGeofencesQuery();

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
    setTrackingCategory(insideGeoFences(newUserLocation, geoFences));

    if (trackingCategory) {
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
    setScore(0);
    setCounterRunning(true);
    setIsTracking(true);
  };

  const stopTracking = () => {
    setCounterRunning(false);
    setIsTracking(false);
  };

  useInterval(
    () => {
      setScore(score + 1);
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
      <Text style={{ ...Typography.bodyText, position: 'absolute', top: 10, left: 20 }}>
        [InGeoFence={inGeofence ? 'true' : 'false'}] [counterRunning={counterRunning ? 'true' : 'false'}]
      </Text>
      <Text style={{ ...Typography.bodyText, position: 'absolute', top: 20, left: 20 }}>
        [isTracking={isTracking ? 'true' : 'false'}] [category={trackingCategory ? 'true' : 'false'}]
      </Text>
      <View style={styles.trackingInfoContainer}>
        {isTracking ? (
          <>
            <Text style={{ ...Typography.largeBodyText }}>You have earned</Text>
            <Text style={{ ...Typography.headerText }}>{score}</Text>
            <Text style={{ ...Typography.largeBodyText }}>so far in this session</Text>
          </>
        ) : (
          <Text style={{ ...Typography.headerText, textAlign: 'center' }}>Start hovering to earn points!</Text>
        )}
      </View>
      <View style={styles.trackingButtonContainer}>
        {isTracking ? (
          <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.red }]} onPress={stopTracking}>
            <Text style={styles.trackingButtonText}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.green }]} onPress={startTracking}>
            <Text style={styles.trackingButtonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
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
  trackingButtonContainer: {
    height: '30%',
    alignItems: 'center',
  },
  trackingButton: {
    padding: Spacing.small,
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
