import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { StatusBar } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './components/AuthProvider';
import useCachedResources from './hooks/useCachedResources';
import { apolloClient } from './lib/apollo';
import AppNavigation from './navigation/RootNavigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
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
