import { LatLng } from 'react-native-maps';
import { PolygonGeoFence, CircleGeoFence } from 'types/geoFenceTypes';

export const isInsideCircle = (userLocation: LatLng, geoFence: CircleGeoFence) => {
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

export const isInsideRectangle = (userLocation: LatLng, geoFence: PolygonGeoFence) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const classifyPoint = require('robust-point-in-polygon');
  const polygon = geoFence.coordinates.map((coordinate) => {
    return [coordinate.latitude, coordinate.longitude];
  });
  const insidePolygon = classifyPoint(polygon, [userLocation.latitude, userLocation.longitude]);
  if (insidePolygon === 1 || insidePolygon === 0) return true;
  return false;
};
