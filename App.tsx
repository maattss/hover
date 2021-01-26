import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import AppNavigation from './navigation/RootNavigation';
import * as SplashScreen from 'expo-splash-screen';
import { setContext } from '@apollo/link-context';
import Firebase from './lib/firebase';
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthProvider from './components/AuthProvider';
import TrackingProvider from './components/TrackingProvider';

const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: `Bearer ${await Firebase.auth().currentUser?.getIdToken()}`,
    },
  };
});

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'https://hover.hasura.app/v1/graphql',
});

export const apolloClient = new ApolloClient({
  cache: cache,
  link: asyncAuthLink.concat(httpLink),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-first' } },
});

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  const isLoadingAssets = useCachedResources();
  if (isLoadingAssets || loadingCache) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <TrackingProvider>
          <SafeAreaProvider>
            <AppNavigation />
            <StatusBar animated barStyle={'light-content'} />
          </SafeAreaProvider>
        </TrackingProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
