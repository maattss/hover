import React, { useState, createRef, useEffect } from 'react';
import MapView, { Circle, EventUserLocation, LatLng, MapTypes, Polygon, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, Alert } from 'react-native';
import {
  GeoFence,
  GeoFenceVariant,
  CircleGeoFence,
  PolygonGeoFence,
  GeoFenceCategory,
} from '../../types/geoFenceTypes';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import SnackBar, { SnackBarVariant } from '../../components/SnackBar';
import { isInsideCircle, isInsidePolygon } from '../../helpers/geoFenceCalculations';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { convertToGeoFence } from '../../helpers/objectMappers';

const { width, height } = Dimensions.get('window');

// Default location NTNU Trondheim
const defaultLocation: LatLng = {
  latitude: 63.419,
  longitude: 10.4025,
};

const MapScreen: React.FC = () => {
  const [mapRegion, setMapRegion] = useState<LatLng>();
  const [userLocation, setUserLocation] = useState<LatLng>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [geoFences, setGeoFences] = useState<GeoFence[]>();

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

  const regionChange = (region: Region) => {
    setMapRegion(region);
  };

  const userChange = (location: EventUserLocation) => {
    const newUserLocation: LatLng = {
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

  const isInsideGeoFences = (userLocation: LatLng) => {
    if (geoFences) {
      for (const geoFence of geoFences) {
        if (geoFence.variant == GeoFenceVariant.CIRCLE) {
          if (isInsideCircle(userLocation, geoFence as CircleGeoFence)) return true;
        }
        if (geoFence.variant == GeoFenceVariant.POLYGON) {
          if (isInsidePolygon(userLocation, geoFence as PolygonGeoFence)) return true;
        }
      }
    }
  };

  const drawGeoFences = () => {
    if (geoFences) {
      return geoFences.map((geoFence, index) => {
        if (geoFence.variant === GeoFenceVariant.CIRCLE) {
          const currentGeoFence = geoFence as CircleGeoFence;
          return (
            <Circle
              key={index}
              center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
              radius={currentGeoFence.radius}
              fillColor={currentGeoFence.category === GeoFenceCategory.EDUCATION ? Colors.red : Colors.blue}
              strokeWidth={0.1}
            />
          );
        } else if (geoFence.variant === GeoFenceVariant.POLYGON) {
          const currentGeoFence = geoFence as PolygonGeoFence;
          return (
            <Polygon key={index} coordinates={currentGeoFence.coordinates} fillColor={Colors.red} strokeWidth={0.1} />
          );
        }
      });
    }
  };

  if (fetchError) {
    console.error('Error:', fetchError);
    Alert.alert('Error', fetchError.message);
  }
  return (
    <View style={styles.container}>
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        showsUserLocation
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
