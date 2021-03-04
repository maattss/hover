import AsyncStorage from '@react-native-async-storage/async-storage';

export const storePushToken = async (value: string) => {
  storeString('@hover_push', value);
};
export const readPushToken = async () => {
  return readString('@hover_push');
};
export const storeGeofence = async (value: unknown) => {
  storeObject('@hover_current_geofence', value);
};
export const readGeofence = async () => {
  return readObject('@hover_current_geofence');
};
export const storeTrackingLocations = async (value: unknown) => {
  storeObject('@hover_tracking_locations', value);
};
export const readTrackingLocations = async () => {
  return readObject('@hover_tracking_locations');
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
