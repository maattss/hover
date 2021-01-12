import { LatLng } from 'react-native-maps';

export interface CircleGeoFence {
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  radius: number;
}
// TODO: This should by renamed polygon
export interface RectangleGeoFence {
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  coordinates: LatLng[];
}

export enum GeoFenceVariant {
  CIRCLE,
  RECTANGLE,
}

export type GeoFence = CircleGeoFence | RectangleGeoFence;
