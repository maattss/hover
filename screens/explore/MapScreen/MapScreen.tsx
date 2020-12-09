import React, { useState } from 'react';
import MapView, { Circle } from 'react-native-maps';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { Location } from '../../../types';
import { useTheme } from '../../../theme/ThemeProvider';

const { width, height } = Dimensions.get('window');

const TabTwoScreen: React.FC = () => {
  const [mapLocation, setMapLocation] = useState<Location>();
  const [userLocation, setUserLocation] = useState<Location>();

  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 63.419,
          longitude: 10.4025,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09 * (width / height),
        }}
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
        <Text style={styles.textStyle}>
          User location: ({userLocation ? userLocation.latitude.toPrecision(5) : 'Unknown'},{' '}
          {userLocation ? userLocation.longitude.toPrecision(5) : 'Unknown'})
        </Text>
        <Text style={styles.textStyle}>
          Map region: ({mapLocation ? mapLocation.latitude.toPrecision(5) : ''},{' '}
          {mapLocation ? mapLocation.longitude.toPrecision(5) : ''})
        </Text>
        <Circle
          center={{ latitude: 63.419, longitude: 10.4025 }}
          radius={100}
          fillColor={colors.primary}
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
  textStyle: {
    backgroundColor: 'transparent',
  },
});

export default TabTwoScreen;
