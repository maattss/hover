import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { checkMultiPermissions } from '../helpers/checkPermissions';
import { NOTIFY_WITHIN_AREA } from '../tasks';
import { useQuery } from '@apollo/client';
import { GET_GEOFENCES } from '../lib/queries/geoFenceQueries';
import { Alert } from 'react-native';
import { convertToRegion } from '../helpers/mapCalculations';

// This task checks if user's position is within a given regions
const NotifyWithinAreaTask = () => {
  const [regions, setRegions] = useState<Location.LocationRegion[]>();

  const { data: data, loading, error: fetchError } = useQuery(GET_GEOFENCES);

  useEffect(() => {
    if (!loading && data) {
      console.log(data.geofences);
      setRegions(convertToRegion(data.geofences));
    }
  }, [data]);
  useEffect(() => {
    checkMultiPermissions().then(() => startLocationTracking());
  }, [regions]);

  const startLocationTracking = async () => {
    await Location.startGeofencingAsync(NOTIFY_WITHIN_AREA, regions);
  };

  if (fetchError) {
    console.log('Error:', fetchError);
    Alert.alert('Error', fetchError.message);
  }
  return <></>;
};
export default NotifyWithinAreaTask;
