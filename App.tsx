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
import AuthProvider from './components/providers/AuthProvider';
import TrackingProvider from './components/providers/TrackingProvider';
import { GRAPHQL_API_URL } from './lib/config';
import fragmentMatcher from './types/fragmentMatcher';
import PushNotificationProvider from './components/providers/PushNotificationProvider';
import NotificationProvider from './components/providers/NotificationProvider';
import { LikesFragmentFragment } from './graphql/Fragments.generated';
import * as TaskManager from 'expo-task-manager';
import { startBackgroundFetch } from './tasks/fetchBackgroundTasks';

const asyncAuthLink = setContext(async () => {
  return {
    headers: {
      Authorization: `Bearer ${await Firebase.auth().currentUser?.getIdToken()}`,
    },
  };
});

const cache = new InMemoryCache({
  possibleTypes: fragmentMatcher.possibleTypes,
  typePolicies: {
    feed: {
      fields: {
        likes: {
          merge(incoming: LikesFragmentFragment[]) {
            return incoming;
          },
        },
      },
    },
  },
});

const httpLink = new HttpLink({
  uri: GRAPHQL_API_URL,
});

export const apolloClient = new ApolloClient({
  cache: cache,
  link: asyncAuthLink.concat(httpLink),
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true);
  const [unregisterTasks, setUnregisterTasks] = useState(true);
  const [startedBackgroundFetch, setStartedBackgroundFetch] = useState(false);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
    TaskManager.unregisterAllTasksAsync().then(() => setUnregisterTasks(false));
    startBackgroundFetch().then(() => setStartedBackgroundFetch(true));
  }, []);

  const isLoadingAssets = useCachedResources();
  if (isLoadingAssets || loadingCache || unregisterTasks || !startedBackgroundFetch) {
    SplashScreen.preventAutoHideAsync();
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  return (
    <AuthProvider>
      <ApolloProvider client={apolloClient}>
        <TrackingProvider>
          <PushNotificationProvider>
            <NotificationProvider>
              <SafeAreaProvider>
                <AppNavigation />
                <StatusBar animated barStyle={'light-content'} />
              </SafeAreaProvider>
            </NotificationProvider>
          </PushNotificationProvider>
        </TrackingProvider>
      </ApolloProvider>
    </AuthProvider>
  );
}
