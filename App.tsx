import React from 'react';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './theme/ThemeProvider';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import ScreenContainer from './screens/ScreenContainer';
import { Switch } from './components/Switch';
import { View } from 'react-native';

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
        </ThemeProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
