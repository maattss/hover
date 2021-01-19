import React, { useEffect } from 'react';
import * as Location from 'expo-location';
import { NOTIFY_WITHIN_AREA } from '../tasks';
import { Alert } from 'react-native';
import { convertToRegion } from '../helpers/mapCalculations';
import { GeofencesQuery, useGeofencesQuery } from '../graphql/queries/Geofences.generated';

export const startGeofencing = async (data: GeofencesQuery) => {
  console.log('Starting geofencing updates ...');
  if (data) {
    const regions = convertToRegion(data);
    Location.startGeofencingAsync(NOTIFY_WITHIN_AREA, regions);
  }
};

export const stopGeofencing = async (data: GeofencesQuery) => {
  console.log('Stoping geofencing updates ...');
  Location.startGeofencingAsync(NOTIFY_WITHIN_AREA);
};
