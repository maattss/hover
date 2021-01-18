import React from 'react';
import * as Location from 'expo-location';
import { LOCATION_BACKGROUND_TRACKING } from '../tasks';

// This task fetches the user's position
const LocationBackgroundTask = () => {
  Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING, {
    accuracy: Location.Accuracy.Highest,
    timeInterval: 60 * 1000,
    // android behavior
    foregroundService: {
      notificationTitle: 'Office marathon is active',
      notificationBody: 'Monitoring your location to measure total distance',
      notificationColor: '#333333',
    },
    // ios behavior
    activityType: Location.ActivityType.Fitness,
    showsBackgroundLocationIndicator: true,
  });
  console.log('[tracking]', 'started background location task');

  return <></>;
};
export default LocationBackgroundTask;
