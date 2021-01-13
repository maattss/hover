import { ApolloProvider } from '@apollo/client';
import React, { useEffect, useState } from 'react';
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
  console.log('taskmanager', LOCATION_BACKGROUND_TRACKING, 'running', 'OS:', Platform.OS);
  if (error) {
    console.log('LOCATION_BACKGROUND_TRACKING task ERROR:', error);
    return;
  }
  if (locations) {
    console.log('Received new locations', locations);
    const lat = locations[0].coords.latitude;
    const long = locations[0].coords.longitude;

    console.log(`${new Date(Date.now()).toLocaleString()}: ${lat},${long}`);
  }
});

const LOCATION_GEOFENCING_EVENT = 'location-geofencing-event';
TaskManager.defineTask(LOCATION_GEOFENCING_EVENT, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    console.error('Error:', error.code, error.message);
    return;
  }
  if (eventType === LocationGeofencingEventType.Enter) {
    console.log("You've entered region:", region);
  } else if (eventType === LocationGeofencingEventType.Exit) {
    console.log("You've left region:", region);
  }
});
