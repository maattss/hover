import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { checkMultiPermissions } from '../helpers/checkPermissions';
import { EXIT_AREA_TRACKING } from '../tasks';

// This task checks if user leaves a region
const ExitAreaTrackingTask = (regions: Location.LocationRegion[]) => {
  useEffect(() => {
    if (regions) {
      checkMultiPermissions().then(() => startLocationTracking());
    }
  }, []);
  const startLocationTracking = async () => {
    await Location.startGeofencingAsync(EXIT_AREA_TRACKING, regions);
  };
  return <></>;
};
export default ExitAreaTrackingTask;
