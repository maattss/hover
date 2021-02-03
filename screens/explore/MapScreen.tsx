import React, { useState, createRef, useEffect } from 'react';
import MapView, { Circle, LatLng, MapTypes, Polygon, Region } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import SnackBar, { SnackBarVariant } from '../../components/SnackBar';
import useTracking from '../../hooks/useTracking';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../../components/GeoFences';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const [mapRegion, setMapRegion] = useState<LatLng>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');
  const [centreOnUser, setCentreOnUser] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const tracking = useTracking();
  tracking.refetchGeofences();

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
  useEffect(() => {
    if (tracking.insideGeoFence) {
      setShowSnackbar(true);
    } else {
      setShowSnackbar(false);
    }
  }, [tracking.insideGeoFence]);

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
      <MapView
        ref={mapView}
        mapType={chosenMapType}
        showsUserLocation
        style={styles.mapStyle}
        onRegionChange={(region) => regionChange(region)}
        onRegionChangeComplete={(region) => regionChange(region)}
        onMapReady={animateMapToUserPos}
        onDoublePress={() => setCentreOnUser(false)}
        onPanDrag={() => setCentreOnUser(false)}>
        <GeoFences geofences={tracking.geoFences} />
      </MapView>

      <View style={styles.positionContainer}>
        <Text style={styles.infoText}>
          User location: ({tracking.userLocation ? tracking.userLocation.coords.latitude.toPrecision(5) : 'Unknown'},{' '}
          {tracking.userLocation ? tracking.userLocation.coords.longitude.toPrecision(5) : 'Unknown'})
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
        title={'Inside a Hover zone!'}
        show={showSnackbar}
        setShow={setShowSnackbar}
        message={'Head over to the Hover screen to start tracking.'}
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
