import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './theme/ThemeProvider';

import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <ThemeProvider>
          <Navigation />
          <StatusBar style="dark" />
        </ThemeProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
