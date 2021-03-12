import * as Location from 'expo-location';
import { LOCATION_BACKGROUND_TRACKING } from '../tasks';

export const startBackgroundUpdate = async () => {
  console.log('Started background location tracking...');
  await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 1000,
    // Android behavior
    foregroundService: {
      notificationTitle: 'Location tracking in Hover is active',
      notificationBody: 'Monitoring your location during an activity to calculate your score.',
    },
    // iOS behavior
    activityType: Location.ActivityType.Fitness,
    showsBackgroundLocationIndicator: true,
  });
};

export const stopBackgroundUpdate = async () => {
  console.log('Stopped background location updates...');
  await Location.stopLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING);
};
