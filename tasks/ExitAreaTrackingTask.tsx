import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import { EXIT_AREA_TRACKING } from '../tasks';

// This task checks if user leaves a region
const ExitAreaTrackingTask = (regions: Location.LocationRegion[]) => {
  const [permission] = Permissions.usePermissions(Permissions.LOCATION, { ask: true });
  if (!permission || permission.status !== 'granted') {
    Alert.alert('Hey! You need to enable location services.');
  }

  useEffect(() => {
    if (regions && permission?.status !== 'granted') Location.startGeofencingAsync(EXIT_AREA_TRACKING, regions);
  }, [regions, permission]);
  return <></>;
};
export default ExitAreaTrackingTask;
