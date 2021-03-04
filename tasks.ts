import { LocationObject } from 'expo-location';
import { defineTask, TaskManagerTaskExecutor } from 'expo-task-manager';
import { insideGeoFences } from './helpers/geoFenceCalculations';
import { readGeofence } from './helpers/storage';

export const LOCATION_BACKGROUND_TRACKING = 'location-background-tracking';

const task: TaskManagerTaskExecutor = async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_BACKGROUND_TRACKING task ERROR:', error.message);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyData: any = data;
  if (anyData.locations) {
    const currentLocation: LocationObject = anyData.locations[0];
    const geoFence = await readGeofence();
    const insideGeoFence = insideGeoFences(currentLocation, [geoFence]);
    if (!insideGeoFence) {
      const currentTime = new Date().toJSON;
      console.log('Oh no, outside geofence');
      // If prev location was inside geofence add to storage and send push
    } else {
      // If prev location was outside geofence add to storage
      console.log('Yay, you are inside geofence');
    }

    const { coords, timestamp } = currentLocation;
    const { latitude, longitude } = coords;
    console.log(`[Background update] ${timestamp}:  ${latitude}, ${longitude}`);
  }
};

defineTask(LOCATION_BACKGROUND_TRACKING, task);
