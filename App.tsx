import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './styles/ThemeProvider';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <ThemeProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
