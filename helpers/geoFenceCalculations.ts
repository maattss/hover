/* eslint-disable @typescript-eslint/no-var-requires */
import { Colors } from '../theme';
import { hexToRGB } from '../theme/colors';
import { PolygonGeoFence, CircleGeoFence, GeoFence, GeoFenceVariant, GeoFenceCategory } from '../types/geoFenceTypes';
import { LocationObject } from 'expo-location';
import { LatLng } from 'react-native-maps';
import { Asset } from 'expo-asset';

export const insideGeoFences = (userLocation: LocationObject, geoFences: GeoFence[] | undefined) => {
  if (geoFences) {
    for (const geoFence of geoFences) {
      if (geoFence.variant == GeoFenceVariant.CIRCLE) {
        if (isInsideCircle(userLocation, geoFence as CircleGeoFence)) return geoFence;
      }
      if (geoFence.variant == GeoFenceVariant.POLYGON) {
        if (isInsidePolygon(userLocation, geoFence as PolygonGeoFence)) return geoFence;
      }
    }
  }
};

const isInsideCircle = (userLocation: LocationObject, geoFence: CircleGeoFence) => {
  const distance = measureCircleDistance(
    userLocation.coords.latitude,
    userLocation.coords.longitude,
    geoFence.latitude,
    geoFence.longitude,
  );
  if (distance <= geoFence.radius) return true;
  return false;
};

const isInsidePolygon = (userLocation: LocationObject, geoFence: PolygonGeoFence) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const classifyPoint = require('robust-point-in-polygon'); // Exactly determines if a point is contained in a 2D polygon.
  const polygon = geoFence.coordinates.map((coordinate) => {
    return [coordinate.latitude, coordinate.longitude];
  });
  const insidePolygon = classifyPoint(polygon, [userLocation.coords.latitude, userLocation.coords.longitude]);
  if (insidePolygon === -1 || insidePolygon === 0) return true;
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
export const addMetersToLatLng = (latitude: number, longitude: number, dy: number, dx: number): [number, number] => {
  const R = 6378.137 * 1000; // Radius of earth in meters
  const newLatitude = latitude + (dy / R) * (180 / Math.PI);
  const newLongitude = longitude + ((dx / R) * (180 / Math.PI)) / Math.cos((latitude * Math.PI) / 180);
  return [newLatitude, newLongitude];
};

export const estimatedRadius = (coordinates: LatLng[]) => {
  let biggestLength = 0;
  let length: number;
  coordinates.forEach((coordinateA) => {
    coordinates.forEach((coordinateB) => {
      length = measureCircleDistance(
        coordinateA.latitude,
        coordinateA.longitude,
        coordinateB.latitude,
        coordinateB.longitude,
      );
      if (length > biggestLength) biggestLength = length;
    });
  });
  return Math.sqrt(biggestLength);
};

export const getGeoFenceColor = (category: GeoFenceCategory, opacity: number) => {
  switch (category) {
    case GeoFenceCategory.EDUCATION:
      return hexToRGB(Colors.red, opacity);
    case GeoFenceCategory.CULTURE:
      return hexToRGB(Colors.green, opacity);
    case GeoFenceCategory.EXERCISE:
      return hexToRGB(Colors.blue, opacity);
    case GeoFenceCategory.SOCIAL:
      return hexToRGB(Colors.orange, opacity);
    default:
      return hexToRGB(Colors.almostBlack, opacity);
  }
};

export const getGeoFenceScoreRatio = (category: GeoFenceCategory) => {
  switch (category) {
    case GeoFenceCategory.EDUCATION:
      return 1 / 60;
    case GeoFenceCategory.CULTURE:
      return 1 / 12;
    case GeoFenceCategory.EXERCISE:
      return 1 / 12;
    case GeoFenceCategory.SOCIAL:
      return 1 / 60;
    default:
      return 1 / 60;
  }
};

export const getGeoFenceImage = (category: GeoFenceCategory | undefined) => {
  switch (category) {
    case GeoFenceCategory.EDUCATION:
      return Asset.fromModule(require('../assets/images/categoryIcons/education.png')).uri;
    case GeoFenceCategory.CULTURE:
      return Asset.fromModule(require('../assets/images/categoryIcons/culture.png')).uri;
    case GeoFenceCategory.EXERCISE:
      return Asset.fromModule(require('../assets/images/categoryIcons/exercise.png')).uri;
    case GeoFenceCategory.SOCIAL:
      return Asset.fromModule(require('../assets/images/categoryIcons/social.png')).uri;
    default:
      return Asset.fromModule(require('../assets/images/adaptive-icon.png')).uri;
  }
};
