import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './components/AuthProvider';
import useCachedResources from './hooks/useCachedResources';
import { apolloClient } from './lib/apollo';
import AppNavigation from './navigation/RootNavigation';
import * as SplashScreen from 'expo-splash-screen';
import TrackingProvider from './components/TrackingProvider';
import Compose from './components/Compose';

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
          <AppNavigation />
          <StatusBar animated barStyle={'light-content'} />
        </SafeAreaProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
