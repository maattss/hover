import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { LOCATION_BACKGROUND_TRACKING } from '../tasks';
import { alertIfLocationServiceDisabledAsync } from '../helpers/checkPermissions';

// This task fetches the user's position
const LocationBackgroundTask = () => {
  useEffect(() => {
    alertIfLocationServiceDisabledAsync().then(() => startLocationTracking());
  }, []);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 6000,
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING);
    console.log('hasStartedLocationUpdatesAsync:', hasStarted);
  };
  return <></>;
};
export default LocationBackgroundTask;
