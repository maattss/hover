import React, { useState, createRef } from 'react';
import MapView, { Circle, EventUserLocation, MapTypes, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { Location } from '../../types/defaultTypes';
import { GeoFence, GeoFenceVariant, CircleGeoFence, RectangleGeoFence } from '../../types/geoFenceTypes';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import SnackBar, { SnackBarVariant } from '../../components/SnackBar';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  // Default location NTNU Trondheim
  const defaultLocation: Location = {
    latitude: 63.419,
    longitude: 10.4025,
  };

  // Example locations, only for testing purposes. Should be fetched from db.
  const exampleCircleGeoFence1: CircleGeoFence = {
    latitude: 58.886713,
    longitude: 5.73246,
    variant: GeoFenceVariant.CIRCLE,
    radius: 10,
  };
  const exampleCircleGeoFence2: CircleGeoFence = {
    latitude: 58.88671,
    longitude: 5.7324,
    variant: GeoFenceVariant.CIRCLE,
    radius: 10,
  };
  const exampleSquareGeoFence: RectangleGeoFence = {
    latitude: 63.419,
    longitude: 10.4025,
    variant: GeoFenceVariant.RECTANGLE,
    xDistance: 10,
    yDistance: 10,
  };
  const exampleGeoFences: GeoFence[] = [exampleCircleGeoFence1, exampleCircleGeoFence2, exampleSquareGeoFence];

  const [mapRegion, setMapRegion] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

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

  const regionChange = (region: Region) => {
    setMapRegion(region);
  };
  const userChange = (location: EventUserLocation) => {
    const newUserLocation: Location = {
      latitude: location.nativeEvent.coordinate.latitude,
      longitude: location.nativeEvent.coordinate.longitude,
    };
    setUserLocation(newUserLocation);
    if (isInsideGeoFences(newUserLocation)) {
      setShowSnackBar(true);
    } else {
      setShowSnackBar(false);
    }
  };

  const mapView = createRef<MapView>();
  const animateMapToUserPos = () => {
    if (userLocation) setCentreOnUser(true);
    mapView.current?.animateToRegion(
      {
        longitude: userLocation ? userLocation.longitude : defaultLocation.longitude,
        latitude: userLocation ? userLocation.latitude : defaultLocation.latitude,
        latitudeDelta: 0.04,
        longitudeDelta: 0.04 * (width / height),
      },
      1000,
    );
  };

  const isInsideGeoFences = (userLocation: Location) => {
    exampleGeoFences.forEach((geoFence) => {
      if (geoFence.variant == GeoFenceVariant.CIRCLE) {
        if (isInsideCircle(userLocation, geoFence as CircleGeoFence)) return true;
      } else if (geoFence.variant == GeoFenceVariant.RECTANGLE) {
        if (isInsideRectangle(userLocation, geoFence as RectangleGeoFence)) return true;
      }
    });
    return false;
  };

  const isInsideCircle = (userLocation: Location, geoFence: CircleGeoFence) => {
    const distance = measureCircleDistance(
      userLocation.latitude,
      userLocation.longitude,
      geoFence.latitude,
      geoFence.longitude,
    );
    if (distance <= geoFence.radius) return true;
    return false;
  };

  const measureCircleDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    // Generally used geo measurement function
    const R = 6378.137; // Radius of earth in KM
    const dLat = (lat2 * Math.PI) / 180 - (lat1 * Math.PI) / 180;
    const dLon = (lon2 * Math.PI) / 180 - (lon1 * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1000; // Convert to meters
  };

  // TODO: Implement
  const isInsideRectangle = (userLocation: Location, geoFence: RectangleGeoFence) => {
    return false;
  };

  const drawGeoFences = () => {
    return exampleGeoFences.map((geoFence) => {
      if (geoFence.variant === GeoFenceVariant.CIRCLE) {
        const currentGeoFence = geoFence as CircleGeoFence;
        return (
          <Circle
            center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
            radius={currentGeoFence.radius}
            fillColor={Colors.red}
            strokeWidth={0.1}
          />
        );
      } else if (geoFence.variant === GeoFenceVariant.RECTANGLE) {
        const currentGeoFence = geoFence as RectangleGeoFence;
        return (
          <Circle
            center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
            radius={10}
            fillColor={Colors.red}
            strokeWidth={0.1}
          />
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        showsUserLocation
        showsMyLocationButton
        style={styles.mapStyle}
        onRegionChange={(region) => regionChange(region)}
        onRegionChangeComplete={(region) => regionChange(region)}
        onUserLocationChange={(location) => userChange(location)}
        onMapReady={animateMapToUserPos}
        onDoublePress={() => setCentreOnUser(false)}
        onPanDrag={() => setCentreOnUser(false)}>
        {drawGeoFences()}
      </MapView>

      <View style={styles.positionContainer}>
        <Text style={styles.infoText}>
          User location: ({userLocation ? userLocation.latitude.toPrecision(5) : 'Unknown'},{' '}
          {userLocation ? userLocation.longitude.toPrecision(5) : 'Unknown'})
        </Text>
        <Text style={styles.infoText}>
          Map region: ({mapRegion ? mapRegion.latitude.toPrecision(5) : ''},{' '}
          {mapRegion ? mapRegion.longitude.toPrecision(5) : ''})
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.mapStyleButton} onPress={toggleMapType}>
          <FAIcon style={mapTypeIconStyle} name="globe-europe" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.centreOnUserButton} onPress={animateMapToUserPos}>
          <FAIcon style={centreOnUserIconStyle} name="crosshairs" />
        </TouchableOpacity>
      </View>
      <SnackBar
        variant={SnackBarVariant.INFO}
        title={'Earning points!'}
        message={'You are inside a geofence and will automatically earn points when you are inside this area.'}
        show={showSnackBar}
        setShow={setShowSnackBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mapStyle: {
    width,
    height,
  },
  infoContainer: {
    position: 'absolute',
    top: '6%',
    right: '0.5%',
  },
  positionContainer: {
    backgroundColor: Colors.almostBlack,
    alignItems: 'flex-start',
    position: 'absolute',
    top: '6%',
    left: '0.5%',
    padding: Spacing.smaller,
    margin: 0,
    borderRadius: 10,
  },
  infoText: {
    ...Typography.bodyText,
    color: Colors.white,
    paddingBottom: Spacing.hairline,
    backgroundColor: Colors.almostBlack,
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
  icon: {
    fontSize: Typography.icon.fontSize,
    color: Colors.blue,
  },
});

export default MapScreen;
