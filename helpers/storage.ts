import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';
import { GeoFence } from '../types/geoFenceTypes';

const TRACKING_INFO_KEY = '@hover_tracking_info';
const LOCATION_EVENTS_KEY = '@hover_location_events';
const PAUSE_EVENTS_KEY = '@hover_pause_events';
const PUSH_KEY = '@hover_push_token';
const PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY = '@hover_outside_geofence_previous_push';
const PREVIOUS_INSIDE_GEOFENCE_PUSH_KEY = '@hover_inside_geofence_previous_push';
const GEOFENCES_KEY = '@hover_geofences';

export interface TrackingInfo {
  geoFence: GeoFence;
  friendId: string;
  trackingWithFriendId: number;
  duration: number;
  score: number;
  startTimestamp: number;
  endTimestamp: number;
  updatedAtTimestamp: number;
}

export interface LocationEvent {
  location: LocationObject;
  insideGeofence: boolean;
}

export interface PauseEvent {
  timestamp: number;
  paused: boolean;
}

export interface InsideGeoFencePush {
  timestamp: number;
  geoFenceId: number;
}

export const storeGeoFences = async (value: GeoFence[]) => storeObject(GEOFENCES_KEY, value);

export const readGeoFences = async () => {
  const geoFences: GeoFence[] = await readObject(GEOFENCES_KEY);
  if (!geoFences) return [];
  return geoFences;
};

export const storePushToken = async (value: string) => storeString(PUSH_KEY, value);

export const readPushToken = async () => await readString(PUSH_KEY);

export const storePreviousInsideGeofencePush = async (id: number) => {
  const previousInsideGeoFencePush: InsideGeoFencePush = {
    geoFenceId: id,
    timestamp: Date.now(),
  };
  storeObject(PREVIOUS_INSIDE_GEOFENCE_PUSH_KEY, previousInsideGeoFencePush);
};

export const readPreviousInsideGeofencePush = async () => {
  const insideGeoFencePush: InsideGeoFencePush = await readObject(PREVIOUS_INSIDE_GEOFENCE_PUSH_KEY);
  return insideGeoFencePush;
};

export const updatePreviousOutsideGeofencePushTimestamp = async () =>
  storeString(PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY, Date.now().toString());

export const readPreviousOutsideGeofencePushTimestamp = async () =>
  Number((await readString(PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY)) ?? '0');

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

export const clearPushStorage = async () =>
  clear([PUSH_KEY, PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY, PREVIOUS_INSIDE_GEOFENCE_PUSH_KEY]);

export const clearPreviousOutsidePushStorage = async () => clear([PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY]);

export const clearPreviousInsidePushStorage = async () => clear([PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY]);

export const clearGeofencesStorage = async () => clear([GEOFENCES_KEY]);

export const clearTrackingStorage = async () =>
  clear([PAUSE_EVENTS_KEY, LOCATION_EVENTS_KEY, TRACKING_INFO_KEY, PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY]);

export const clearAll = async () =>
  clear([
    PAUSE_EVENTS_KEY,
    LOCATION_EVENTS_KEY,
    PUSH_KEY,
    PREVIOUS_INSIDE_GEOFENCE_PUSH_KEY,
    PREVIOUS_OUTSIDE_GEOFENCE_PUSH_KEY,
    TRACKING_INFO_KEY,
    GEOFENCES_KEY,
  ]);

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
