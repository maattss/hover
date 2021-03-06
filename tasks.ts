import { LocationObject } from 'expo-location';
import { insideGeoFences } from './helpers/geoFenceCalculations';
import {
  readGeofence,
  readLocationEvents,
  readPushToken,
  storeLocationEvents,
  LocationEvent,
  readTrackingStart,
} from './helpers/storage';
import { sendPushNotification } from './helpers/pushNotifications';
import * as TaskManager from 'expo-task-manager';
import Constants from 'expo-constants';

export const LOCATION_BACKGROUND_TRACKING = 'location-background-tracking';

TaskManager.defineTask(LOCATION_BACKGROUND_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error('LOCATION_BACKGROUND_TRACKING: ', error.message);
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyData: any = data;
  if (anyData.locations) {
    const currentLocation: LocationObject = anyData.locations[0];
    const trackingStart = Number((await readTrackingStart()) ?? '0');

    // Locations with timestamp before tracking started should be discarded
    if (currentLocation.timestamp < trackingStart) return;

    const geoFence = await readGeofence();
    if (!geoFence) {
      console.error('LOCATION_BACKGROUND_TRACKING: No geofence present in storage.');
      return;
    }
    const insideGeoFence = insideGeoFences(currentLocation, [geoFence]);
    const trackingLocations = await readLocationEvents();

    if (!insideGeoFence) {
      if (trackingLocations.length === 0) {
        const location: LocationEvent = {
          location: currentLocation,
          insideGeofence: false,
        };
        storeLocationEvents([location]);
        return;
      }
      const lastStoredLocation = trackingLocations[trackingLocations.length - 1];
      if (lastStoredLocation.insideGeofence === true) {
        console.log('Background location event: Moved back in to geofence.');
        const location: LocationEvent = {
          location: currentLocation,
          insideGeofence: false,
        };
        storeLocationEvents([...trackingLocations, location]);
        if (Constants.isDevice) {
          const pushToken = await readPushToken();
          if (pushToken) {
            sendPushNotification(
              pushToken,
              'Oh noo! You are outside the Hover zone...',
              'Move back in to continue earning points (tracking will start automagically).',
              true,
            );
          }
        }
      }
    } else {
      if (trackingLocations.length === 0) {
        const location: LocationEvent = {
          location: currentLocation,
          insideGeofence: true,
        };
        storeLocationEvents([location]);
        return;
      }
      const lastStoredLocation = trackingLocations[trackingLocations.length - 1];
      if (lastStoredLocation.insideGeofence === false) {
        console.log('Background location event: Moved out of geofence.');
        const location: LocationEvent = {
          location: currentLocation,
          insideGeofence: true,
        };
        storeLocationEvents([...trackingLocations, location]);
      }
    }
  }
});
