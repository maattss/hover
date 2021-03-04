import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocationObject } from 'expo-location';
import { GeoFence } from '../types/geoFenceTypes';

export interface TrackingLocation {
  location: LocationObject;
  insideGeofence: boolean;
}

export const storePushToken = async (value: string) => storeString('@hover_push', value);

export const readPushToken = async () => await readString('@hover_push');

export const storeGeofence = async (value: GeoFence) => storeObject('@hover_current_geofence', value);

export const readGeofence = async () => {
  const geoFence: GeoFence = await readObject('@hover_current_geofence');
  return geoFence;
};

export const storeTrackingLocations = async (value: TrackingLocation[]) =>
  storeObject('@hover_tracking_locations', value);

export const readTrackingLocations = async () => {
  const locations: TrackingLocation[] = await readObject('@hover_tracking_locations');
  if (!locations) return [];
  return locations;
};

// General
const storeString = async (value: string, key: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error('Error saving', value, 'to async storage.');
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
    console.error('Error reading value from async storage.');
  }
};
const storeObject = async (key: string, value: unknown) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error saving', value, 'to async storage.');
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
