import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';
import { GeoFence } from '../types/geoFenceTypes';

const GEOFENCE_KEY = '@hover_current_geofence';
const TRACKING_KEY = '@hover_tracking_locations';
const PUSH_KEY = '@hover_push';

export interface TrackingLocation {
  location: LocationObject;
  insideGeofence: boolean;
}

export const storePushToken = async (value: string) => storeString(PUSH_KEY, value);

export const readPushToken = async () => await readString(PUSH_KEY);

export const storeGeofence = async (value: GeoFence) => storeObject(GEOFENCE_KEY, value);

export const readGeofence = async () => {
  const geoFence: GeoFence = await readObject(GEOFENCE_KEY);
  return geoFence;
};

export const storeTrackingLocations = async (value: TrackingLocation[]) => storeObject(TRACKING_KEY, value);

export const readTrackingLocations = async () => {
  const locations: TrackingLocation[] = await readObject(TRACKING_KEY);
  if (!locations) return [];
  return locations;
};

export const clearHoverStorage = async () => {
  try {
    await AsyncStorage.multiRemove([GEOFENCE_KEY, TRACKING_KEY, PUSH_KEY]);
  } catch (e) {
    console.error('STORAGE: Error clearing Hover storage', e);
  }
};

// General
const storeString = async (value: string, key: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('STORAGE: Error saving', value, 'to async storage.', e);
  }
};
const readString = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
    throw Error('Value is null');
  } catch (e) {
    console.error('STORAGE: Error reading value from async storage.');
  }
};
const storeObject = async (key: string, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('STORAGE: Error saving', value, 'to async storage.');
  }
};
const readObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading value from async storage.');
  }
};
