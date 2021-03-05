import React, { Fragment } from 'react';
import { Image, View } from 'react-native';
import { Circle, Polygon, Marker } from 'react-native-maps';
import { GeoFence, GeoFenceVariant, CircleGeoFence, PolygonGeoFence } from '../../types/geoFenceTypes';
import { getGeoFenceColor, getGeoFenceImage } from '../../helpers/geoFenceCalculations';

interface GeoFencesProps {
  geofences?: GeoFence[];
  zoom?: number;
}

const drawGeoFences = (geoFences: GeoFence[] | undefined, zoom: number, customMarker: boolean) => {
  if (geoFences) {
    return geoFences.map((geoFence, index) => {
      const zoomScaling = Math.ceil((zoom ?? 0) * 1500);
      const geoFenceSizeScaling = Math.ceil(geoFence.radius / 4);
      const size = 40 - zoomScaling + geoFenceSizeScaling;

      if (geoFence.variant === GeoFenceVariant.CIRCLE) {
        const currentGeoFence = geoFence as CircleGeoFence;
        return (
          <View key={index}>
            <Circle
              center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
              radius={currentGeoFence.radius}
              fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
              strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
              strokeWidth={1}
            />

            {/* Default marker for maps without zoom, e.g. activity cards */}
            {!customMarker && (
              <Marker
                coordinate={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
                title={currentGeoFence.name}
                description={currentGeoFence.name}
              />
            )}

            {/* Custom info marker for bigger maps (maps with zoom, e.g. explore screen) */}
            {size > 5 && customMarker && (
              <Marker
                coordinate={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
                title={currentGeoFence.name}
                description={currentGeoFence.description}>
                <View
                  style={{
                    backgroundColor: getGeoFenceColor(currentGeoFence.category, 1),
                    borderRadius: size,
                    padding: size / 5,
                  }}>
                  <Image
                    source={{ uri: getGeoFenceImage(currentGeoFence.category) }}
                    style={{ height: size, width: size }}
                  />
                </View>
              </Marker>
            )}
          </View>
        );
      } else if (geoFence.variant === GeoFenceVariant.POLYGON) {
        const currentGeoFence = geoFence as PolygonGeoFence;
        return (
          <Fragment key={index}>
            <Polygon
              coordinates={currentGeoFence.coordinates}
              fillColor={getGeoFenceColor(currentGeoFence.category, 0.7)}
              strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
              strokeWidth={2}
            />

            {/* Default marker for maps without zoom */}
            {!customMarker && (
              <Marker
                coordinate={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
                title={'Polygon'}
                description={currentGeoFence.name}
              />
            )}

            {/* Custom info marker for bigger maps (maps with zoom, e.g. explore screen) */}
            {size > 5 && customMarker && (
              <Marker
                title={currentGeoFence.name}
                description={currentGeoFence.description}
                coordinate={{ latitude: geoFence.latitude, longitude: geoFence.longitude }}>
                <View
                  style={{
                    backgroundColor: getGeoFenceColor(currentGeoFence.category, 1),
                    borderRadius: size,
                    padding: size / 5,
                  }}>
                  <Image
                    source={{ uri: getGeoFenceImage(currentGeoFence.category) }}
                    style={{ height: size, width: size }}
                  />
                </View>
              </Marker>
            )}
          </Fragment>
        );
      }
    });
  }
};

const GeoFences: React.FC<GeoFencesProps> = ({ geofences, zoom }: GeoFencesProps) => {
  if (zoom) return <>{drawGeoFences(geofences, zoom, true)}</>;
  return <>{drawGeoFences(geofences, 0, false)}</>;
};

export default GeoFences;
