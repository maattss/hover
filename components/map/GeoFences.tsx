import React, { Fragment } from 'react';
import { Image, Text, View } from 'react-native';
import { Circle, Polygon, Overlay, Coordinate, Callout, Marker } from 'react-native-maps';
import {
  GeoFence,
  GeoFenceVariant,
  CircleGeoFence,
  PolygonGeoFence,
  GeoFenceCategory,
} from '../../types/geoFenceTypes';
import { addMetersToLatLng, getGeoFenceColor, getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import { Typography, Colors } from '../../theme';
import { FontAwesome as FAIcon } from '@expo/vector-icons';
import { hexToRGB } from '../../theme/colors';

interface GeoFencesProps {
  geofences?: GeoFence[];
  zoom?: number;
}

const drawGeoFences = (geoFences: GeoFence[] | undefined, zoom: number, customMarker: boolean) => {
  console.log('zoom geofences', zoom);
  if (geoFences) {
    return geoFences.map((geoFence, index) => {
      const zoomScaling = Math.ceil((zoom ?? 0) * 2000);
      const geoFenceSizeScaling = Math.ceil(geoFence.radius / 4);
      const textSize = 50 - zoomScaling + geoFenceSizeScaling;
      if (geoFence.variant === GeoFenceVariant.CIRCLE) {
        const currentGeoFence = geoFence as CircleGeoFence;
        console.log('Text size', textSize);
        return (
          <Fragment key={index}>
            <Circle
              center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
              radius={currentGeoFence.radius}
              fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
              strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
              strokeWidth={1}
            />
            {/* Default marker for maps without zoom */}
            {!customMarker && (
              <Marker
                coordinate={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
                title={currentGeoFence.name}
                description={currentGeoFence.name}
              />
            )}

            {/* Custom info marker for bigger maps (maps with zoom, e.g. explore screen) */}
            {textSize > 0 && customMarker && (
              <Marker
                coordinate={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
                title={currentGeoFence.name}
                description={currentGeoFence.description}>
                <Image
                  source={{ uri: getGeoFenceImage(currentGeoFence.category) }}
                  style={{ height: textSize, width: textSize }}
                />
              </Marker>
            )}
          </Fragment>
        );
      } else if (geoFence.variant === GeoFenceVariant.POLYGON) {
        const currentGeoFence = geoFence as PolygonGeoFence;
        return (
          <Fragment key={index}>
            <Polygon
              coordinates={currentGeoFence.coordinates}
              fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
              strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
              strokeWidth={1}
            />
            <Circle
              center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
              radius={currentGeoFence.radius}
              fillColor={getGeoFenceColor(GeoFenceCategory.EDUCATION, 0.4)}
              strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
              strokeWidth={1}
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
            {textSize > 0 && customMarker && (
              <Marker
                coordinate={{ latitude: geoFence.latitude, longitude: geoFence.longitude }}
                title={currentGeoFence.name}
                description={currentGeoFence.description}>
                <Image
                  source={{ uri: getGeoFenceImage(currentGeoFence.category) }}
                  style={{ height: textSize, width: textSize }}
                />
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
