import * as Location from 'expo-location';
import { LOCATION_BACKGROUND_TRACKING } from '../tasks';

export const startBackgroundUpdate = async () => {
  console.log('Started background location tracking...');
  await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 60 * 1000,
    // Android behavior
    foregroundService: {
      notificationTitle: 'Location background service is active',
      notificationBody: 'Monitoring your location to alert you of entering a valid area.',
      notificationColor: '#333333',
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
