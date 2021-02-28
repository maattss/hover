import React, { useState, createRef, useEffect } from 'react';
import MapView, { EventUserLocation, LatLng, MapTypes, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, View, TouchableOpacity, ViewStyle } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/map/GeoFences';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TrackingState } from '../providers/TrackingProvider';

interface HoverMapProps {
  customWidth?: number;
  customHeight?: number;
}

const HoverMap: React.FC<HoverMapProps> = ({ customWidth, customHeight }: HoverMapProps) => {
  const width = customWidth ? customWidth : Dimensions.get('screen').width;
  const height = customHeight ? customHeight : Dimensions.get('screen').height;

  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [userLocationMap, setUserLocationMap] = useState<LatLng | null>(null);
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [zoom, setZoom] = useState<number>(0.02);
  const tracking = useTracking();
  const centreVerticalOffset = -0.005;

  const insets = useSafeAreaInsets();
  const userRegion: Region = {
    latitude: tracking.userLocation
      ? tracking.userLocation.coords.latitude + centreVerticalOffset
      : defaultMapLocation.latitude,
    longitude: tracking.userLocation ? tracking.userLocation.coords.longitude : defaultMapLocation.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  };

  // Refetch geofences and animate map to user position on init render
  useEffect(() => {
    setUserLocationMap({
      latitude: tracking.userLocation ? tracking.userLocation.coords.latitude : defaultMapLocation.latitude,
      longitude: tracking.userLocation ? tracking.userLocation.coords.longitude : defaultMapLocation.longitude,
    });
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

  const shouldUpdateUserLocation = () => {
    if (tracking.trackingState === TrackingState.TRACKING) return true;
    if (tracking.trackingState === TrackingState.TRACKINGPAUSED) return true;
  };

  useEffect(() => {
    if (shouldUpdateUserLocation() && userLocationMap) tracking.updateUserLocation(userLocationMap);
  }, [userLocationMap]);

  // Map event functions
  const mapView = createRef<MapView>();
  const toggleMapType = () =>
    chosenMapType === 'satellite' ? setChosenMapType('standard') : setChosenMapType('satellite');
  const animateMapToUserPos = () => {
    setCentreOnUser(true);
    mapView.current?.animateToRegion(userRegion, 1000);
  };
  const userLocationChange = (e: EventUserLocation) => {
    setUserLocationMap({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
    });
  };
  const getSafeAreaTop = () => {
    return {
      marginTop: insets.top + Spacing.smallest,
    } as ViewStyle;
  };

  return (
    <>
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        initialRegion={userRegion}
        showsUserLocation
        style={{ width: width, height: height }}
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
    </>
  );
};

const styles = StyleSheet.create({
  mapInfo: {
    position: 'absolute',
    left: Spacing.smallest,
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
