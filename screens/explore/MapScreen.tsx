import React, { useState } from 'react';
import MapView, { Circle, MapTypes } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';
import { Location } from '../../types';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const [mapLocation, setMapLocation] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();
  const [chosenMapType, setChosenMapType] = useState<MapTypes>('standard');

  const iconStyle = {
    fontSize: Typography.icon.fontSize,
    color: chosenMapType === 'satellite' ? Colors.blue : Colors.white,
  };

  const toggleMapType = () =>
    chosenMapType === 'satellite' ? setChosenMapType('standard') : setChosenMapType('satellite');

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 63.419,
          longitude: 10.4025,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09 * (width / height),
        }}
        mapType={chosenMapType}
        showsUserLocation
        userLocationAnnotationTitle="Your location"
        minZoomLevel={5}
        style={styles.mapStyle}
        onRegionChange={(region) =>
          setMapLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          })
        }
        onRegionChangeComplete={(region) =>
          setMapLocation({
            latitude: region.latitude,
            longitude: region.longitude,
          })
        }
        onUserLocationChange={(location) =>
          setUserLocation({
            latitude: location.nativeEvent.coordinate.latitude,
            longitude: location.nativeEvent.coordinate.longitude,
          })
        }>
        <Circle
          center={{ latitude: 63.419, longitude: 10.4025 }}
          radius={100}
          fillColor={Colors.almostBlack}
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
          <FAIcon style={iconStyle} name="globe-europe" />
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
    top: '8%',
    left: '85%',
  },
  positionContainer: {
    backgroundColor: Colors.almostBlack,
    alignItems: 'flex-start',
    position: 'absolute',
    top: '8%',
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
  icon: {
    fontSize: Typography.icon.fontSize,
    color: Colors.blue,
  },
});

export default MapScreen;
