import * as Location from 'expo-location';
import { EXIT_AREA_TRACKING } from '../tasks';

// This task checks if user leaves a region
export const exitAreaTrackingTask = async (regions: Location.LocationRegion[]) => {
  console.log('Listening for user exit on region', regions[0]);
  await Location.startGeofencingAsync(EXIT_AREA_TRACKING, regions);
};
