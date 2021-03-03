import * as TaskManager from 'expo-task-manager';

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
