import React, { useState, createRef, useEffect } from 'react';
import MapView, { MapTypes } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/GeoFences';
import { StackNavigationProp } from '@react-navigation/stack';
import { HoverStackParamList } from '../../types/navigationTypes';

const { width, height } = Dimensions.get('window');

type NavigationProp = StackNavigationProp<HoverStackParamList>;

type ExploreProps = {
  navigation: NavigationProp;
};

const TrackingScreen: React.FC<ExploreProps> = ({ navigation }: ExploreProps) => {
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
  const stopTracking = () => {
    tracking.pauseTracking();
    navigation.navigate('Publish');
  };

  return (
    <SafeAreaView style={styles.container}>
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

      <View style={styles.trackingInfoContainer}>
        <Text style={styles.scoreText}>Duration: {tracking.duration}</Text>
        <Text style={styles.scoreText}>Score: {Math.floor(tracking.score)}</Text>
        <ActivityIndicator size={'large'} color={Colors.blue} />
      </View>

      <View style={styles.trackingControlsContainer}>
        <View style={styles.stopButtonContainer}>
          <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.red }]} onPress={stopTracking}>
            <Text style={styles.trackingButtonText}>Stop</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
    height: '30%',
    padding: Spacing.smallest,
    margin: Spacing.smaller,
    marginBottom: Spacing.smallest,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
  },
  trackingControlsContainer: {
    height: '25%',
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
