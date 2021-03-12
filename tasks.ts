import { LocationObject } from 'expo-location';
import { insideGeoFences } from './helpers/geoFenceCalculations';
import {
  readLocationEvents,
  readPushToken,
  storeLocationEvents,
  LocationEvent,
  readPreviousPushUpdate,
  storePreviousPushUpdate,
  readTrackingInfo,
  readGeoFences,
  readPreviousGeofenceIdPush,
  storePreviousGeofenceIdPush,
} from './helpers/storage';
import { sendPushNotification } from './helpers/pushNotifications';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import Constants from 'expo-constants';

export const LOCATION_BACKGROUND_TRACKING = 'location-background-tracking';
export const NOTIFICATION_WHEN_INSIDE_GEOFENCE = 'notification-when-inside-geofence';

TaskManager.defineTask(LOCATION_BACKGROUND_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error('LOCATION_BACKGROUND_TRACKING: ', error.message);
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyData: any = data;
  if (anyData.locations) {
    const currentLocation: LocationObject = anyData.locations[0];
    const trackingInfo = await readTrackingInfo();

    if (!trackingInfo.geoFence) {
      console.error('LOCATION_BACKGROUND_TRACKING: No geofence present in storage.');
      return;
    }

    // Locations with timestamp before tracking started should be discarded
    if (currentLocation.timestamp < trackingInfo.startTimestamp) return;

    const insideGeoFence = insideGeoFences(currentLocation, [trackingInfo.geoFence]);
    const trackingLocations = await readLocationEvents();

    if (!insideGeoFence) {
      // If tracking accuracy is poor, we should not treat it as an "Out of geofence event"
      if (currentLocation.coords.accuracy && currentLocation.coords.accuracy < 10) return;

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
        console.log('Background location event: Moved out of geofence.');
        const location: LocationEvent = {
          location: currentLocation,
          insideGeofence: false,
        };
        storeLocationEvents([...trackingLocations, location]);

        if (Constants.isDevice) {
          const pushToken = await readPushToken();
          const previousPushUpdate = await readPreviousPushUpdate();

          // Send push notification if it is more than 5 minutes since previous
          // "Outside geofence" push notification was sent.
          if ((pushToken && !previousPushUpdate) || (pushToken && previousPushUpdate < Date.now() - 5 * 60)) {
            sendPushNotification(
              pushToken,
              'Oh noo! You are outside the Hover zone...',
              'Move back in to continue earning points. ' +
                'Tracking will start automagically when you are inside the Hover zone.',
              true,
              true,
            );
            storePreviousPushUpdate(Date.now());
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
        console.log('Background location event: Moved back in to geofence.');
        const location: LocationEvent = {
          location: currentLocation,
          insideGeofence: true,
        };
        storeLocationEvents([...trackingLocations, location]);
      }
    }
  }
});

TaskManager.defineTask(NOTIFICATION_WHEN_INSIDE_GEOFENCE, async () => {
  console.log('Background fetch task running');
  const geoFences = await readGeoFences();
  if (geoFences.length > 0) {
    const currentLocation = await Location.getCurrentPositionAsync({});
    const insideGeoFence = insideGeoFences(currentLocation, geoFences);
    if (insideGeoFence) {
      const trackingLocations = await readLocationEvents();
      if (trackingLocations.length === 0) {
        // Not currently tracking
        const previousGeofenceIdPush = await readPreviousGeofenceIdPush();
        if (previousGeofenceIdPush === 0 || insideGeoFence.id !== previousGeofenceIdPush) {
          const pushToken = await readPushToken();
          if (pushToken) {
            sendPushNotification(
              pushToken,
              'Hi there! I see you are inside a Hover zone',
              'Do you want to start tracking?.',
              true,
              false,
            );
            storePreviousGeofenceIdPush(insideGeoFence.id);
          }
        }
      }
    }
  }
});
