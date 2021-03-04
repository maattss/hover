import { LocationObject } from 'expo-location';
import { defineTask, TaskManagerTaskExecutor } from 'expo-task-manager';
import { insideGeoFences } from './helpers/geoFenceCalculations';
import {
  readGeofence,
  readTrackingLocations,
  readPushToken,
  storeTrackingLocations,
  TrackingLocation,
} from './helpers/storage';
import { sendPushNotification } from './helpers/pushNotifications';

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
    const trackingLocations = await readTrackingLocations();
    console.log('Tracking...');
    console.log(trackingLocations);

    if (!insideGeoFence) {
      if (trackingLocations.length === 0) {
        const location: TrackingLocation = {
          location: currentLocation,
          insideGeofence: false,
        };
        storeTrackingLocations([location]);
        return;
      }
      const lastStoredLocation = trackingLocations[trackingLocations.length - 1];
      if (lastStoredLocation.insideGeofence === true) {
        console.log('Moved out of Hover zone');
        const location: TrackingLocation = {
          location: currentLocation,
          insideGeofence: false,
        };
        storeTrackingLocations([...trackingLocations, location]);
        // TODO: Uncomment to send push token
        // const pushToken = await readPushToken();
        // if (pushToken) {
        //   sendPushNotification(
        //     pushToken,
        //     'Oh noo! Outside Hover zone...',
        //     'Move back to continue earning points.',
        //     true,
        //   );
        // }
      }
    } else {
      if (trackingLocations.length === 0) {
        console.log('Moved back in to the Hover zone');
        const location: TrackingLocation = {
          location: currentLocation,
          insideGeofence: true,
        };
        storeTrackingLocations([location]);
        return;
      }
      const lastStoredLocation = trackingLocations[trackingLocations.length - 1];
      if (lastStoredLocation.insideGeofence === false) {
        const location: TrackingLocation = {
          location: currentLocation,
          insideGeofence: true,
        };
        storeTrackingLocations([...trackingLocations, location]);
      }
    }
  }
};

defineTask(LOCATION_BACKGROUND_TRACKING, task);
