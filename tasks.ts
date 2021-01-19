import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

/*
 * Tasks must be defined in the top-level scope,
 * using TaskManager.defineTask(...)
 *
 * Tasks can be called within useEffect().
 */

/**
 * General - updates user's location.
 */
export const LOCATION_BACKGROUND_TRACKING = 'location-background-tracking';
TaskManager.defineTask(LOCATION_BACKGROUND_TRACKING, async ({ data: { locations }, error }) => {
  if (error) {
    console.log('LOCATION_BACKGROUND_TRACKING task ERROR:', error.message);
    return;
  }
  if (locations) {
    const { coords, timestamp } = locations[0];
    const { latitude, longitude } = coords;

    console.log(`[Background update] ${timestamp}:  ${latitude}, ${longitude}`);
  }
});

/**
 * Should be used to notify users when they enter a valid area
 */
export const NOTIFY_WITHIN_AREA = 'notify-within-area';
TaskManager.defineTask(NOTIFY_WITHIN_AREA, ({ data: { eventType, region }, error }) => {
  if (error) {
    console.error('Error:', error.code, error.message);
    return;
  }
  if (eventType === Location.LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.LocationGeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});

/**
 * Should be used while recoring activity
 */
export const EXIT_AREA_TRACKING = 'exit-area-tracking';
TaskManager.defineTask(EXIT_AREA_TRACKING, ({ data: { eventType, region }, error }) => {
  if (error) {
    console.error('Error:', error.code, error.message);
    return;
  }
  if ((eventType as Location.LocationGeofencingEventType) === Location.LocationGeofencingEventType.Exit) {
    console.log("You've left the area:", region);
    Alert.alert("You've left the area. Would you like to publish your activity?");
  }
});
