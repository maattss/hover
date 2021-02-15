import { LatLng } from 'react-native-maps';

export interface CircleGeoFence {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  category: GeoFenceCategory;
  radius: number;
}
export interface PolygonGeoFence {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  category: GeoFenceCategory;
  radius: number;
  coordinates: LatLng[];
}
export enum GeoFenceVariant {
  CIRCLE = 'CIRCLE',
  POLYGON = 'POLYGON',
}
export enum GeoFenceCategory {
  EDUCATION = 'EDUCATION',
  EXERCISE = 'EXERCISE',
  SOCIAL = 'SOCIAL',
  CULTURE = 'CULTURE',
}

export type GeoFence = CircleGeoFence | PolygonGeoFence;
