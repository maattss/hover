import React, { useState, createRef } from 'react';
import MapView, { MapTypes } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/GeoFences';

const { width, height } = Dimensions.get('window');

const TrackingScreen: React.FC = () => {
  // Map state
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);
  const tracking = useTracking();

  // Dynamic styles
  const mapTypeIconStyle = {
    fontSize: Typography.icon.fontSize,
    color: chosenMapType === 'satellite' ? Colors.blue : Colors.white,
  };
  const centreOnUserIconStyle = {
    fontSize: Typography.icon.fontSize,
    color: centreOnUser ? Colors.blue : Colors.white,
  };

  const toggleMapType = () =>
    chosenMapType === 'satellite' ? setChosenMapType('standard') : setChosenMapType('satellite');

  const mapView = createRef<MapView>();
  const animateMapToUserPos = () => {
    if (tracking.userLocation) setCentreOnUser(true);
    mapView.current?.animateToRegion(
      {
        longitude: tracking.userLocation ? tracking.userLocation.coords.longitude : defaultMapLocation.longitude,
        latitude: tracking.userLocation ? tracking.userLocation.coords.latitude : defaultMapLocation.latitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01 * (width / height),
      },
      1000,
    );
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapView}
          mapType={chosenMapType}
          showsUserLocation
          style={styles.mapStyle}
          onMapReady={animateMapToUserPos}
          onDoublePress={() => setCentreOnUser(false)}
          onPanDrag={() => setCentreOnUser(false)}>
          <GeoFences geofences={tracking.geoFences} />
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

      {/* Tracking information */}
      <View style={styles.trackingInfoContainer}>
        {/* Currently tracking */}
        {tracking.isTracking && !tracking.isTrackingPaused && (
          <>
            <Text style={styles.scoreText}>Score: {Math.floor(tracking.score)}</Text>
            <ActivityIndicator size={'large'} color={Colors.blue} />
          </>
        )}
        {/* Tracking paused */}
        {tracking.isTracking && tracking.isTrackingPaused && (
          <>
            <Text style={styles.scoreText}>Score: {Math.floor(tracking.score)}</Text>
            <Text style={{ ...Typography.largeBodyText }}>Resume to earn more points!</Text>
          </>
        )}
        {/* Not tracking and user in geo fence */}
        {!tracking.isTracking && tracking.isTrackingPaused && tracking.insideGeoFence && (
          <Text style={styles.headerInfoText}>Start hovering {'\n'} to earn points!</Text>
        )}
        {/* Not tracking and user outside geo fence */}
        {!tracking.isTracking && tracking.isTrackingPaused && !tracking.insideGeoFence && (
          <Text style={styles.headerInfoText}>Move to hover zone {'\n'} to earn points!</Text>
        )}
      </View>

      {/* Tracking controls */}
      <View style={styles.trackingControlsContainer}>
        {/* Tracking stopped / not started and user in geo fence */}
        {!tracking.isTracking && tracking.isTrackingPaused && tracking.insideGeoFence && (
          <View style={styles.startButtonContainer}>
            <TouchableOpacity
              style={[styles.trackingButton, { backgroundColor: Colors.green }]}
              onPress={tracking.startTracking}>
              <Text style={styles.trackingButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Tracking paused */}
        {tracking.isTracking && tracking.isTrackingPaused && (
          <View style={styles.startButtonContainer}>
            <TouchableOpacity
              style={[styles.trackingButton, { backgroundColor: Colors.green }]}
              onPress={tracking.startTracking}>
              <Text style={styles.trackingButtonText}>Resume</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Currently Tracking */}
        {tracking.isTracking && !tracking.isTrackingPaused && (
          <View style={styles.stopButtonContainer}>
            <TouchableOpacity
              style={[styles.trackingButton, { backgroundColor: Colors.red }]}
              onPress={tracking.stopTracking}>
              <Text style={styles.trackingButtonText}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.trackingButton, { backgroundColor: Colors.gray800 }]}
              onPress={tracking.pauseTracking}>
              <Text style={styles.trackingButtonText}>Pause</Text>
            </TouchableOpacity>
          </View>
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
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.smaller,
    marginTop: Spacing.smaller,
  },
  trackingInfoContainer: {
    height: '25%',
    padding: Spacing.smallest,
    margin: Spacing.smaller,
    marginBottom: Spacing.smallest,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
  },
  trackingControlsContainer: {
    height: '30%',
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    borderRadius: Spacing.smaller,
  },
  infoContainer: {
    position: 'absolute',
    bottom: '1%',
    right: '1%',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  stopButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Spacing.extraLarge,
    marginRight: Spacing.extraLarge,
  },
  trackingButton: {
    padding: Spacing.smallest,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
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
  scoreText: {
    ...Typography.headerText,
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
  headerInfoText: {
    ...Typography.headerText,
    textAlign: 'center',
  },
});

export default TrackingScreen;