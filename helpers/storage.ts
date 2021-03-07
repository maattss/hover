import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';
import { GeoFence } from '../types/geoFenceTypes';

const GEOFENCE_KEY = '@hover_current_geofence';
const LOCATION_KEY = '@hover_location_events';
const TRACKING_START_KEY = '@hover_tracking_start';
const PAUSE_KEY = '@hover_pause_events';
const PUSH_KEY = '@hover_push_token';
const PREVIOUS_PUSH_KEY = '@hover_previous_push';

export interface LocationEvent {
  location: LocationObject;
  insideGeofence: boolean;
}

export interface PauseEvent {
  timestamp: number;
  paused: boolean;
}

export const storeTrackingStart = async (value: number) => storeString(TRACKING_START_KEY, value.toString());

export const readTrackingStart = async () => Number((await readString(TRACKING_START_KEY)) ?? '0');

export const storePushToken = async (value: string) => storeString(PUSH_KEY, value);

export const readPushToken = async () => await readString(PUSH_KEY);

export const storePreviousPushUpdate = async (value: number) => storeString(PREVIOUS_PUSH_KEY, value.toString());

export const readPreviousPushUpdate = async () => Number((await readString(PREVIOUS_PUSH_KEY)) ?? '0');

export const storeGeofence = async (value: GeoFence) => storeObject(GEOFENCE_KEY, value);

export const readGeofence = async () => {
  const geoFence: GeoFence = await readObject(GEOFENCE_KEY);
  return geoFence;
};

export const storePauseEvents = async (value: PauseEvent[]) => storeObject(PAUSE_KEY, value);

export const readPauseEvents = async () => {
  const events: PauseEvent[] = await readObject(PAUSE_KEY);
  if (!events) return [];
  return events;
};

export const storeLocationEvents = async (value: LocationEvent[]) => storeObject(LOCATION_KEY, value);

export const readLocationEvents = async () => {
  const events: LocationEvent[] = await readObject(LOCATION_KEY);
  if (!events) return [];
  return events;
};

export const clearTrackingStorage = async () => {
  try {
    await AsyncStorage.multiRemove([GEOFENCE_KEY, TRACKING_START_KEY, PAUSE_KEY, LOCATION_KEY]);
  } catch (e) {
    console.error('STORAGE: Error clearing tracking storage', e);
  }
};

export const clearHoverStorage = async () => {
  try {
    await AsyncStorage.multiRemove([GEOFENCE_KEY, TRACKING_START_KEY, PAUSE_KEY, LOCATION_KEY, PUSH_KEY]);
  } catch (e) {
    console.error('STORAGE: Error clearing Hover storage', e);
  }
};

// General
const storeString = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("STORAGE: Error saving string with key '" + key + "' to async storage.", value, e);
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
    console.error("STORAGE: Error reading string with key '" + key + "' from async storage.", e);
  }
};
const storeObject = async (key: string, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("STORAGE: Error saving object with key '" + key + "' to async storage. ", value, e);
  }
};
const readObject = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("STORAGE: Error reading object with key '" + key + "' from async storage. ", e);
  }
};
