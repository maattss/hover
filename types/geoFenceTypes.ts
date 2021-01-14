import { LatLng } from 'react-native-maps';

export interface CircleGeoFence {
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  category: GeoFenceCategory;
  radius: number;
}
export interface PolygonGeoFence {
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  category: GeoFenceCategory;
  coordinates: LatLng[];
}
export enum GeoFenceVariant {
  CIRCLE,
  POLYGON,
}
export enum GeoFenceCategory {
  EDUCATION,
  EXERCISE,
  SOCIAL,
  CULTURE,
}

export type GeoFence = CircleGeoFence | PolygonGeoFence;
