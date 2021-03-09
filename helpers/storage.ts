import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';
import { GeoFence } from '../types/geoFenceTypes';

const TRACKING_INFO_KEY = '@hover_tracking_info';
const LOCATION_EVENTS_KEY = '@hover_location_events';
const PAUSE_EVENTS_KEY = '@hover_pause_events';
const PUSH_KEY = '@hover_push_token';
const PREVIOUS_PUSH_KEY = '@hover_previous_push';

export interface TrackingInfo {
  geoFence: GeoFence;
  friendId: string;
  duration: number;
  score: number;
  startTimestamp: number;
  endTimestamp: number;
}

export interface LocationEvent {
  location: LocationObject;
  insideGeofence: boolean;
}

export interface PauseEvent {
  timestamp: number;
  paused: boolean;
}

export const storePushToken = async (value: string) => storeString(PUSH_KEY, value);

export const readPushToken = async () => await readString(PUSH_KEY);

export const storePreviousPushUpdate = async (value: number) => storeString(PREVIOUS_PUSH_KEY, value.toString());

export const readPreviousPushUpdate = async () => Number((await readString(PREVIOUS_PUSH_KEY)) ?? '0');

export const storeTrackingInfo = async (value: TrackingInfo) => storeObject(TRACKING_INFO_KEY, value);

export const readTrackingInfo = async () => {
  const trackingInfo: TrackingInfo = await readObject(TRACKING_INFO_KEY);
  return trackingInfo;
};

export const storePauseEvents = async (value: PauseEvent[]) => storeObject(PAUSE_EVENTS_KEY, value);

export const readPauseEvents = async () => {
  const events: PauseEvent[] = await readObject(PAUSE_EVENTS_KEY);
  if (!events) return [];
  return events;
};

export const storeLocationEvents = async (value: LocationEvent[]) => storeObject(LOCATION_EVENTS_KEY, value);

export const readLocationEvents = async () => {
  const events: LocationEvent[] = await readObject(LOCATION_EVENTS_KEY);
  if (!events) return [];
  return events;
};

export const clearPushStorage = async () => clear([PUSH_KEY, PREVIOUS_PUSH_KEY]);

export const clearTrackingStorage = async () => clear([PAUSE_EVENTS_KEY, LOCATION_EVENTS_KEY, TRACKING_INFO_KEY]);

export const clearAll = async () =>
  clear([PAUSE_EVENTS_KEY, LOCATION_EVENTS_KEY, PUSH_KEY, PREVIOUS_PUSH_KEY, TRACKING_INFO_KEY]);

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
const clear = async (keys: string[]) => {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.error('STORAGE: Error clearing [' + keys.toString() + ']', e);
  }
};
