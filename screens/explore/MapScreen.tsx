import React, { useState } from 'react';
import MapView, { Circle } from 'react-native-maps';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { Location } from '../../types';
import { Colors, Spacing, Typography } from '../../theme';

const { width, height } = Dimensions.get('window');

const MapScreen: React.FC = () => {
  const [mapLocation, setMapLocation] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 63.419,
          longitude: 10.4025,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09 * (width / height),
        }}
        mapType={'satellite'}
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
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            User location: ({userLocation ? userLocation.latitude.toPrecision(5) : 'Unknown'},{' '}
            {userLocation ? userLocation.longitude.toPrecision(5) : 'Unknown'})
          </Text>
          <Text style={styles.infoText}>
            Map region: ({mapLocation ? mapLocation.latitude.toPrecision(5) : ''},{' '}
            {mapLocation ? mapLocation.longitude.toPrecision(5) : ''})
          </Text>
        </View>
        <Circle
          center={{ latitude: 63.419, longitude: 10.4025 }}
          radius={100}
          fillColor={Colors.almostBlack}
          strokeWidth={0.1}
        />
      </MapView>
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
    display: 'flex',
    position: 'absolute',
    top: '6%',
    left: '3%',
    backgroundColor: Colors.almostBlack,
    alignItems: 'flex-start',
    padding: Spacing.smaller,
    margin: 0,
    borderRadius: 10,
  },
  infoText: {
    ...Typography.bodyText,
    color: Colors.white,
  },
});

export default MapScreen;
