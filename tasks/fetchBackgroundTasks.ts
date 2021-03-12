import * as BackgroundFetch from 'expo-background-fetch';
import { NOTIFICATION_WHEN_INSIDE_GEOFENCE } from '../tasks';

export const startBackgroundFetch = async () => {
  console.log('Start background fetch task...');
  await BackgroundFetch.registerTaskAsync(NOTIFICATION_WHEN_INSIDE_GEOFENCE);
};

export const stopBackgroundFetch = async () => {
  console.log('Stopped background fetch task...');
  await BackgroundFetch.unregisterTaskAsync(NOTIFICATION_WHEN_INSIDE_GEOFENCE);
};
