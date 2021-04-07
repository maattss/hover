import React from 'react';
import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import Loading from '../components/general/Loading';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import useAuthentication from '../hooks/useAuthentication';
import { DarkTheme } from '../theme/colors';
import DisclaimerScreen from '../screens/disclaimer/DisclaimerScreen';
import useTracking from '../hooks/useTracking';
import * as Analytics from 'expo-firebase-analytics';

export const RootStack = createStackNavigator<RootStackParamList>();
const AppNavigation: React.FC = () => {
  const navigationRef = useRef<NavigationContainerRef>(null);
  const routeNameRef = useRef<string>('');
  const { user, isLoadingUser } = useAuthentication();
  const locationPermission = useTracking().locationPermission;
  return (
    <NavigationContainer
      theme={DarkTheme}
      ref={navigationRef}
      onStateChange={async () => {
        const previousRouteName: string = routeNameRef.current;
        const currentRouteName: string = navigationRef.current?.getCurrentRoute()?.name ?? '';

        if (previousRouteName !== currentRouteName) {
          await Analytics.setCurrentScreen(currentRouteName, currentRouteName);
        }
        routeNameRef.current = currentRouteName;
      }}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoadingUser ? (
          <RootStack.Screen name="Loading" component={Loading} />
        ) : user ? (
          locationPermission?.status !== 'granted' ? (
            <RootStack.Screen name="Disclaimer" component={DisclaimerScreen} />
          ) : (
            <RootStack.Screen name="Main" component={TabNavigator} />
          )
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
