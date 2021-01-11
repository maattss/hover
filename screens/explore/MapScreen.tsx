import React, { useState, createRef } from 'react';
import MapView, { Circle, EventUserLocation, MapTypes, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Location } from '../../types/types';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  // Default location NTNU Trondheim
  const defaultLocation: Location = {
    latitude: 63.419,
    longitude: 10.4025,
  };
  // Only for testing purposes
  const exampleCircleLocation: Location = { latitude: 58.886713, longitude: 5.73246 };
  const exampleCircleRadius = 10;

  const [mapLocation, setMapLocation] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);

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

  const regionChange = (region: Region) => {
    setMapLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };
  const userChange = (location: EventUserLocation) => {
    const newUserLocation: Location = {
      latitude: location.nativeEvent.coordinate.latitude,
      longitude: location.nativeEvent.coordinate.longitude,
    };
    if (isInsideCircle(newUserLocation, exampleCircleLocation, exampleCircleRadius)) notify();
    setUserLocation(newUserLocation);
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
  const isInsideCircle = (userLocation: Location, circleLocation: Location, circleRadius: number) => {
    const distance = measure(
      userLocation.latitude,
      userLocation.longitude,
      circleLocation.latitude,
      circleLocation.longitude,
    );
    if (distance <= circleRadius) return true;
    return false;
  };

  const measure = (lat1: number, lon1: number, lat2: number, lon2: number) => {
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

  const notify = () => Alert.alert('Congrats. Inside Geofence!');

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
        <Circle
          center={{ latitude: exampleCircleLocation.latitude, longitude: exampleCircleLocation.longitude }}
          radius={exampleCircleRadius}
          fillColor={Colors.red}
          strokeWidth={0.1}
        />
      </MapView>

      <View style={styles.positionContainer}>
        <Text style={styles.infoText}>
          User location: ({userLocation ? userLocation.latitude.toPrecision(5) : 'Unknown'},{' '}
          {userLocation ? userLocation.longitude.toPrecision(5) : 'Unknown'})
        </Text>
        <Text style={styles.infoText}>
          Map region: ({mapLocation ? mapLocation.latitude.toPrecision(5) : ''},{' '}
          {mapLocation ? mapLocation.longitude.toPrecision(5) : ''})
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
    top: '85%',
    left: '85%',
  },
  positionContainer: {
    backgroundColor: Colors.almostBlack,
    alignItems: 'flex-start',
    position: 'absolute',
    top: '6%',
    left: '3%',
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
