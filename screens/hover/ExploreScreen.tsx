import React, { useState, createRef, useEffect } from 'react';
import MapView, { EventUserLocation, LatLng, MapTypes, Region } from 'react-native-maps';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/map/GeoFences';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ExploreScreen: React.FC = () => {
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [userLocationMap, setUserLocationMap] = useState<LatLng | null>(null);
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [disableTracking, setDisableTracking] = useState(true);
  const [loadingUserPos, setLoadingUserPos] = useState(true);
  const [zoom, setZoom] = useState<number>(0.02);
  const tracking = useTracking();
  const insets = useSafeAreaInsets();
  const userRegion: Region = {
    latitude: userLocationMap ? userLocationMap.latitude : defaultMapLocation.latitude,
    longitude: userLocationMap ? userLocationMap.longitude : defaultMapLocation.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  // Refetch geofences and animate map to user position on init render
  useEffect(() => {
    tracking.refetchGeofences();
    animateMapToUserPos();
  }, []);

  // Dynamic styles
  const mapTypeIconStyle = {
    fontSize: Typography.icon.fontSize,
    color: chosenMapType === 'satellite' ? Colors.blue : Colors.white,
  };
  const centreOnUserIconStyle = {
    fontSize: Typography.icon.fontSize,
    color: centreOnUser ? Colors.blue : Colors.white,
  };

  // Tracking event listener functions
  useEffect(() => {
    if (tracking.userLocation !== null) {
      setLoadingUserPos(false);
    }
    if (tracking.insideGeoFence) {
      setDisableTracking(false);
    } else {
      setDisableTracking(true);
    }
  }, [tracking.insideGeoFence, tracking.userLocation]);

  useEffect(() => {
    if (tracking.userLocation === null && userLocationMap !== null) {
      tracking.updateUserLocation(userLocationMap);
      animateMapToUserPos();
    }
  }, [userLocationMap]);

  // Map event functions
  const mapView = createRef<MapView>();
  const toggleMapType = () =>
    chosenMapType === 'satellite' ? setChosenMapType('standard') : setChosenMapType('satellite');
  const animateMapToUserPos = () => {
    if (tracking.userLocation) {
      setCentreOnUser(true);
      mapView.current?.animateToRegion(userRegion, 1000);
    }
  };
  const startTracking = () => {
    if (!disableTracking) tracking.startTracking();
  };
  const userLocationChange = (e: EventUserLocation) => {
    setUserLocationMap({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };
  const notInsideGeoFenceAlert = () => {
    Alert.alert(
      'Not inside a Hover zone',
      "Sorry, you can't start tracking here! Move to a Hover zone to start earning points.",
      [{ text: 'Ok', style: 'cancel' }],
    );
  };
  const getDynamicButtonStyles = () => {
    if (disableTracking || loadingUserPos) {
      return {
        backgroundColor: Colors.grayTransparent,
      } as ViewStyle;
    } else {
      return {
        backgroundColor: Colors.greenTransparent,
      } as ViewStyle;
    }
  };
  const getSafeAreaTop = () => {
    return {
      marginTop: insets.top,
    } as ViewStyle;
  };

  return (
    <View>
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        initialRegion={userRegion}
        showsUserLocation
        style={styles.mapStyle}
        onUserLocationChange={userLocationChange}
        onDoublePress={() => setCentreOnUser(false)}
        onPanDrag={() => setCentreOnUser(false)}
        onRegionChangeComplete={(region) => setZoom(region.latitudeDelta)}>
        <GeoFences geofences={tracking.geoFences} zoom={zoom} />
      </MapView>

      <View style={[styles.mapInfo, getSafeAreaTop()]}>
        <TouchableOpacity style={styles.mapStyleButton} onPress={toggleMapType}>
          <FAIcon style={mapTypeIconStyle} name="globe-europe" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centreOnUserButton} onPress={animateMapToUserPos}>
          <FAIcon style={centreOnUserIconStyle} name="crosshairs" />
        </TouchableOpacity>
      </View>

      <View style={styles.startButtonContainer}>
        <TouchableOpacity
          style={[styles.startButton, getDynamicButtonStyles()]}
          onPress={disableTracking ? notInsideGeoFenceAlert : startTracking}
          disabled={loadingUserPos}>
          {loadingUserPos && <ActivityIndicator />}
          {!loadingUserPos && <Text style={styles.startButtonText}>Start</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width,
    height,
  },
  mapInfo: {
    position: 'absolute',
    left: Spacing.smaller,
  },
  infoText: {
    ...Typography.bodyText,
    color: Colors.white,
    paddingBottom: Spacing.hairline,
    backgroundColor: Colors.almostBlack,
  },
  mapStyleButton: {
    ...Buttons.iconButton,
    backgroundColor: Colors.almostBlackTransparent,
  },
  centreOnUserButton: {
    ...Buttons.iconButton,
    backgroundColor: Colors.almostBlackTransparent,
    marginTop: Spacing.smallest,
  },
  icon: {
    fontSize: Typography.icon.fontSize,
    color: Colors.blue,
  },
  startButtonContainer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startButton: {
    padding: Spacing.smallest,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: Colors.almostBlack,
    shadowOffset: { height: 0, width: 0 },
  },
  startButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ExploreScreen;
