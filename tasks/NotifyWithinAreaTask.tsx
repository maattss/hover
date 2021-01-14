import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { checkMultiPermissions } from '../helpers/checkPermissions';
import { NOTIFY_WITHIN_AREA } from '../tasks';

// This task checks if user's position is within a given regions
const NotifyWithinAreaTask = () => {
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
        notifyOnEnter: true,
        notifyOnExit: true,
      },
      {
        // name: 'NTNU kontor',
        identifier: '2',
        latitude: 63.4155446,
        longitude: 10.4044603,
        radius: 50,
        notifyOnEnter: true,
        notifyOnExit: true,
      },
    ];
    await Location.startGeofencingAsync(NOTIFY_WITHIN_AREA, regions);
  };
  return <></>;
};
export default NotifyWithinAreaTask;
