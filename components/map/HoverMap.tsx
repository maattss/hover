import React, { useState, createRef, useEffect } from 'react';
import MapView, { EventUserLocation, LatLng, MapTypes, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, View, TouchableOpacity, ViewStyle, Alert } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/map/GeoFences';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HoverMapProps {
  customWidth?: number;
  customHeight?: number;
}

const HoverMap: React.FC<HoverMapProps> = ({ customWidth, customHeight }: HoverMapProps) => {
  const width = customWidth ? customWidth : Dimensions.get('screen').width;
  const height = customHeight ? customHeight : Dimensions.get('screen').height;
  const defaultZoom = 0.02;
  const centreVerticalOffset = -0.005;
  const defaultRegion: Region = {
    latitude: defaultMapLocation.latitude + centreVerticalOffset,
    longitude: defaultMapLocation.longitude,
    latitudeDelta: defaultZoom,
    longitudeDelta: defaultZoom,
  };

  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [userLocationMap, setUserLocationMap] = useState<LatLng>();
  const [mapRegion, setMapRegion] = useState<Region>(defaultRegion);
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [zoom, setZoom] = useState<number>(defaultZoom);

  const tracking = useTracking();
  const insets = useSafeAreaInsets();

  // Refetch geofences and animate map to user position on init render
  useEffect(() => {
    if (tracking.userLocation) {
      setUserLocationMap({
        latitude: tracking.userLocation.coords.latitude,
        longitude: tracking.userLocation.coords.longitude,
      });
      setMapRegion({
        latitude: tracking.userLocation.coords.latitude + centreVerticalOffset,
        longitude: tracking.userLocation.coords.longitude,
        latitudeDelta: defaultZoom,
        longitudeDelta: defaultZoom,
      });
    } else if (userLocationMap) {
      setUserLocationMap({
        latitude: userLocationMap.latitude,
        longitude: userLocationMap.longitude,
      });
      setMapRegion({
        latitude: userLocationMap.latitude + centreVerticalOffset,
        longitude: userLocationMap.longitude,
        latitudeDelta: defaultZoom,
        longitudeDelta: defaultZoom,
      });
    }

    animateMapToUserPos();
    tracking.refetchGeoFences();
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
    if (userLocationMap) tracking.updateUserLocation(userLocationMap);
  }, [userLocationMap]);

  // Map event functions
  const mapView = createRef<MapView>();
  const toggleMapType = () =>
    chosenMapType === 'satellite' ? setChosenMapType('standard') : setChosenMapType('satellite');
  const animateMapToUserPos = () => {
    if (tracking.locationPermission && tracking.locationPermission.status !== 'granted') {
      Alert.alert(
        'Location permission not accepted',
        'Location permission is required to start tracking. Please update it in settings on your device.',
      );
      return;
    }

    if (userLocationMap) {
      const userRegion: Region = {
        latitude: userLocationMap.latitude,
        longitude: userLocationMap.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
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
      marginTop: insets.top + Spacing.smallest,
    } as ViewStyle;
  };

  return (
    <>
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        initialRegion={mapRegion}
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
