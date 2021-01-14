import { ApolloProvider } from '@apollo/client';
<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
=======
import React, { useEffect } from 'react';
>>>>>>>  task manager updates location and verifies geofence position
import { Platform, StatusBar } from 'react-native';
=======
import React from 'react';
import { StatusBar } from 'react-native';
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
