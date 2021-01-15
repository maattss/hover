import { Coordinate, LatLng } from 'react-native-maps';
import { PolygonGeoFence, CircleGeoFence } from '../types/geoFenceTypes';
import { LocationRegion } from 'expo-location';

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

export const isInsidePolygon = (userLocation: LatLng, geoFence: PolygonGeoFence) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const classifyPoint = require('robust-point-in-polygon'); // Exactly determines if a point is contained in a 2D polygon.
  const polygon = geoFence.coordinates.map((coordinate) => {
    return [coordinate.latitude, coordinate.longitude];
  });
  const insidePolygon = classifyPoint(polygon, [userLocation.latitude, userLocation.longitude]);
  if (insidePolygon === -1 || insidePolygon === 0) return true;
  return false;
};

export const estimatedRadius = (coordinates: Coordinate[]) => {
  let biggestLength = 0;
  let length: number;
  coordinates.forEach((coordinateA) => {
    coordinates.forEach((coordinateB) => {
      length = measureCircleDistance(coordinateA[0], coordinateA[1], coordinateB[0], coordinateB[1]);
      if (length > biggestLength) biggestLength = length;
    });
  });
  return Math.sqrt(biggestLength);
};

export const convertToRegion = (geofences: any): LocationRegion[] => {
  const fetchedGeoFences: LocationRegion[] = [];
  for (const obj of geofences) {
    if (obj.variant === 'CIRCLE') {
      fetchedGeoFences.push({
        identifier: obj.id,
        latitude: obj.latitude,
        longitude: obj.longitude,
        radius: obj.radius,
        notifyOnEnter: true,
        notifyOnExit: true,
      });
    } else if (obj.variant === 'POLYGON') {
      const coordinatesRaw: string = obj.coordinates.split(',');
      const coordinates: Coordinate[] = [];
      for (let i = 0; i < coordinatesRaw.length; i = i + 2) {
        coordinates.push([+coordinatesRaw[i], +coordinatesRaw[i + 1]]);
      }
      console.log('Radius:', obj.radius, '      EstimatedRadius:', estimatedRadius(coordinates));
      fetchedGeoFences.push({
        identifier: obj.id,
        latitude: obj.latitude,
        longitude: obj.longitude,
        radius: obj.radius ? obj.radius : estimatedRadius(coordinates),
        notifyOnEnter: true,
        notifyOnExit: true,
      });
    }
  }
  return fetchedGeoFences;
};
