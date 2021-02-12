import React, { useState, createRef, useEffect } from 'react';
import MapView, { EventUserLocation, LatLng, MapTypes, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/map/GeoFences';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const HoverMap: React.FC = () => {
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [userLocationMap, setUserLocationMap] = useState<LatLng | null>(null);
  const [centreOnUser, setCentreOnUser] = useState(false);
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
  const userLocationChange = (e: EventUserLocation) => {
    setUserLocationMap({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
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
});

export default HoverMap;
