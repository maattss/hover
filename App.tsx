import { ApolloProvider } from '@apollo/client';
<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>>  task manager updates location and verifies geofence position
import { Platform, StatusBar } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './components/AuthProvider';
import useCachedResources from './hooks/useCachedResources';
import { apolloClient } from './lib/apollo';
import AppNavigation from './navigation/RootNavigation';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const isLoadingAssets = useCachedResources();
  if (isLoadingAssets) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <SafeAreaProvider>
          <AppearanceProvider>
            <AppNavigation />
            <StatusBar animated barStyle={'light-content'} />
          </AppearanceProvider>
        </SafeAreaProvider>
      </ApolloProvider>
    </AuthProvider>
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
