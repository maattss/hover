import { ApolloProvider } from '@apollo/client';
import React, { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import { apolloClient } from './lib/apollo';
import AppNavigation from './navigation/RootNavigation';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
export default function App() {
  const isLoadingComplete = useCachedResources();

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        return startLocationTracking();
      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, []);

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 6000,
    });
    const regions: Location.LocationRegion[] = [
      {
        identifier: '1',
        latitude: 34.17,
        longitude: -118.4,
        radius: 50,
        notifyOnEnter: true,
        notifyOnExit: true,
      },
      {
        identifier: '2',
        latitude: 63.4155446,
        longitude: 10.4044603,
        radius: 50,
        notifyOnEnter: true,
        notifyOnExit: true,
      },
    ];
    await Location.startGeofencingAsync(LOCATION_GEOFENCING_EVENT, regions);
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(LOCATION_BACKGROUND_TRACKING);
    console.log('hasStartedLocationUpdatesAsync:', hasStarted);
  };
  if (!isLoadingComplete) {
    return null;
  }
  return (
    <ApolloProvider client={apolloClient}>
      <SafeAreaProvider>
        <AppearanceProvider>
          <AppNavigation />
          <StatusBar animated barStyle={'light-content'} />
        </AppearanceProvider>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
const LOCATION_BACKGROUND_TRACKING = 'location-background-tracking';

TaskManager.defineTask(LOCATION_BACKGROUND_TRACKING, async ({ data: { locations }, error }) => {
  console.log('TaskManager', LOCATION_BACKGROUND_TRACKING, 'running', 'OS:', Platform.OS);
  if (error) {
    console.log('LOCATION_BACKGROUND_TRACKING task ERROR:', error.message);
    return;
  }
  if (locations) {
    const { coords, timestamp } = locations[0];
    const { latitude, longitude } = coords;

    console.log(`${timestamp}: ${latitude},${longitude}`);
  }
});

export const LOCATION_GEOFENCING_EVENT = 'location-geofencing-event';
TaskManager.defineTask(LOCATION_GEOFENCING_EVENT, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    console.error('Error:', error.code, error.message);
    return;
  }
  if (eventType === Location.LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === Location.LocationGeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
