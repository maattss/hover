import React from 'react';
import * as Location from 'expo-location';
import { LOCATION_BACKGROUND_TRACKING } from '../tasks';

export const startBackgroundUpdate = async () => {
  console.log('Started Background Updates ...');
  await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 60 * 1000,
    // android behavior
    foregroundService: {
      notificationTitle: 'Location background service is active',
      notificationBody: 'Monitoring your location to alert you of entering a valid area.',
      notificationColor: '#333333',
    },
    // ios behavior
    activityType: Location.ActivityType.Fitness,
    showsBackgroundLocationIndicator: true,
  });
};
const stopBackgroundUpdate = async () => {
  console.log('Stopped Background Updates ...');
  await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING);
};
