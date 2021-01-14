import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { NOTIFY_WITHIN_AREA } from '../tasks';
import { Alert } from 'react-native';
import { convertToRegion } from '../helpers/mapCalculations';
import { useGeofencesQuery } from '../graphql/queries/Geofences.generated';

// This task checks if user's position is within a given regions
const NotifyWithinAreaTask = () => {
  const [regions, setRegions] = useState<Location.LocationRegion[]>();

  const { data: data, loading, error: fetchError } = useGeofencesQuery();

  useEffect(() => {
    if (!loading && data) {
      console.log(data.geofences);
      setRegions(convertToRegion(data.geofences));
    }
  }, [data]);

  useEffect(() => {
    if (regions) Location.startGeofencingAsync(NOTIFY_WITHIN_AREA, regions);
  }, [regions]);

  if (fetchError) {
    console.log('Error:', fetchError);
    Alert.alert('Error', fetchError.message);
  }
  return <></>;
};
export default NotifyWithinAreaTask;
