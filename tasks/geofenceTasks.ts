import * as Location from 'expo-location';
import { NOTIFY_WITHIN_AREA } from '../tasks';
import { convertToRegion } from '../helpers/objectMappers';
import { GeofencesQuery } from '../graphql/queries/Geofences.generated';

export const startGeofencing = async (data: GeofencesQuery) => {
  console.log('Starting geofencing updates ...');
  if (data) {
    const regions = convertToRegion(data);
    Location.startGeofencingAsync(NOTIFY_WITHIN_AREA, regions);
  }
};

export const stopGeofencing = async () => {
  console.log('Stopping geofencing updates ...');
  Location.stopLocationUpdatesAsync(NOTIFY_WITHIN_AREA);
};
