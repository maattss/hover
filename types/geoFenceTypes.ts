import { LatLng } from 'react-native-maps';

export interface TrackedActivity {
  caption: string;
  geofence_id: number;
  score: number;
  started_at: string;
  duration: string;
}

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
