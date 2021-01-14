import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { checkMultiPermissions } from '../helpers/checkPermissions';
import { EXIT_AREA_TRACKING } from '../tasks';

// This task checks if user leaves a region
const ExitAreaTrackingTask = () => {
  useEffect(() => {
    checkMultiPermissions().then(() => startLocationTracking());
  }, []);
  const startLocationTracking = async () => {
    const regions: Location.LocationRegion[] = [
      {
        // name: 'Samfundet',
        identifier: '1',
        latitude: 63.4225,
        longitude: 10.3952,
        radius: 50,
        notifyOnEnter: false,
        notifyOnExit: true,
      },
    ];
    await Location.startGeofencingAsync(EXIT_AREA_TRACKING, regions);
  };
  return <></>;
};
export default ExitAreaTrackingTask;
