import React from 'react';
import { StatusBar } from 'react-native';
import { AppearanceProvider } from 'react-native-appearance';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './theme/ThemeProvider';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';
import { useTheme } from './theme/ThemeProvider';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const { isDark } = useTheme();

  if (!isLoadingComplete) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <AppearanceProvider>
        <ThemeProvider>
          <Navigation />
          <StatusBar animated barStyle={isDark ? 'light-content' : 'dark-content'} />
        </ThemeProvider>
      </AppearanceProvider>
    </SafeAreaProvider>
  );
}
