export interface CircleGeoFence {
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  radius: number;
}
export interface RectangleGeoFence {
  latitude: number;
  longitude: number;
  variant: GeoFenceVariant;
  xDistance: number;
  yDistance: number;
}

export enum GeoFenceVariant {
  CIRCLE,
  RECTANGLE,
}

export type GeoFence = CircleGeoFence | RectangleGeoFence;
