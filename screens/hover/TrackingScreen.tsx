import React, { useState, createRef } from 'react';
import MapView, { MapTypes, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
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
  const defaultRegion: Region = {
    longitude: tracking.userLocation ? tracking.userLocation.coords.longitude : defaultMapLocation.longitude,
    latitude: (tracking.userLocation ? tracking.userLocation.coords.latitude : defaultMapLocation.latitude) - 0.003,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01 * (width / height),
  };
  const animateMapToUserPos = () => {
    if (tracking.userLocation) setCentreOnUser(true);
    mapView.current?.animateToRegion(defaultRegion, 1000);
  };
  const stopTracking = () => {
    tracking.pauseTracking();
    navigation.navigate('Publish');
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        showsUserLocation
        style={styles.mapStyle}
        initialRegion={defaultRegion}
        onDoublePress={() => setCentreOnUser(false)}
        onPanDrag={() => setCentreOnUser(false)}>
        <GeoFences geofences={tracking.geoFences} />
      </MapView>

      <View style={styles.mapInfo}>
        <TouchableOpacity style={styles.mapStyleButton} onPress={toggleMapType}>
          <FAIcon style={mapTypeIconStyle} name="globe-europe" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centreOnUserButton} onPress={animateMapToUserPos}>
          <FAIcon style={centreOnUserIconStyle} name="crosshairs" />
        </TouchableOpacity>
      </View>

      <View style={styles.trackingContainer}>
        <View style={styles.trackingInfo}>
          <ActivityIndicator size={'large'} color={Colors.blue} />
          <Text style={styles.scoreText}>Points: {Math.floor(tracking.score)}</Text>
        </View>
        <View style={styles.stopButtonContainer}>
          <TouchableOpacity style={styles.stopButton} onPress={stopTracking}>
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
          <View />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trackingContainer: {
    position: 'absolute',
    bottom: '1%',
    left: '1%',
    width: '98%',
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: Spacing.base,
  },
  trackingInfo: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.smaller,
  },
  stopButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.smaller,
  },
  container: {
    width: '100%',
    height: '100%',
  },
  mapContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Spacing.smaller,
    marginTop: Spacing.smaller,
  },
  mapStyle: {
    width: '100%',
    height: '100%',
    borderRadius: Spacing.smaller,
  },
  mapInfo: {
    position: 'absolute',
    top: Spacing.extraLarge,
    left: '1%',
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
  stopButton: {
    padding: Spacing.smallest,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
    backgroundColor: Colors.redTransparent,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: Colors.almostBlack,
    shadowOffset: { height: 0, width: 0 },
  },
  stopButtonText: {
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
