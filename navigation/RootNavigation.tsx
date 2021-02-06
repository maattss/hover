import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import TabNavigator from './TabNavigator';
import AuthNavigator from './AuthNavigator';
import useAuthentication from '../hooks/useAuthentication';
import { DarkTheme } from '../theme/colors';
import Loading from '../components/Loading';

export const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  const { user, isLoadingUser } = useAuthentication();

  return (
    <NavigationContainer theme={DarkTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoadingUser ? (
          <RootStack.Screen name="Loading" component={Loading} />
        ) : user ? (
          <RootStack.Screen name="Main" component={TabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
