import React from 'react';
import { Circle, Polygon } from 'react-native-maps';
import { GeoFence, GeoFenceVariant, CircleGeoFence, PolygonGeoFence } from '../types/geoFenceTypes';
import { getGeoFenceColor } from '../helpers/geoFenceCalculations';

interface GeoFencesProps {
  geofences?: GeoFence[];
}

const drawGeoFences = (geoFences: GeoFence[] | undefined) => {
  if (geoFences) {
    return geoFences.map((geoFence, index) => {
      if (geoFence.variant === GeoFenceVariant.CIRCLE) {
        const currentGeoFence = geoFence as CircleGeoFence;
        return (
          <Circle
            key={index}
            center={{ latitude: currentGeoFence.latitude, longitude: currentGeoFence.longitude }}
            radius={currentGeoFence.radius}
            fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
            strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
            strokeWidth={1}
          />
        );
      } else if (geoFence.variant === GeoFenceVariant.POLYGON) {
        const currentGeoFence = geoFence as PolygonGeoFence;
        return (
          <Polygon
            key={index}
            coordinates={currentGeoFence.coordinates}
            fillColor={getGeoFenceColor(currentGeoFence.category, 0.6)}
            strokeColor={getGeoFenceColor(currentGeoFence.category, 1)}
            strokeWidth={1}
          />
        );
      }
    });
  }
};

const GeoFences: React.FC<GeoFencesProps> = ({ geofences }: GeoFencesProps) => {
  return <>{drawGeoFences(geofences)}</>;
};

export default GeoFences;
