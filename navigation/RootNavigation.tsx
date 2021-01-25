import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import LoadingScreen from '../screens/auth/LoadingScreen';
import useAuthentication from '../hooks/useAuthentication';
import { DarkTheme } from '../theme/colors';

export const RootStack = createStackNavigator<RootStackParamList>();

const MainContainer: React.FC = () => <TabNavigator />;

const AppNavigation: React.FC = () => {
  const { user, isLoadingUser } = useAuthentication();

  return (
    <NavigationContainer theme={DarkTheme}>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isLoadingUser ? (
          <RootStack.Screen name="Loading" component={LoadingScreen} />
        ) : user ? (
          <RootStack.Screen name="Main" component={MainContainer} />
        ) : (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Signup" component={SignUpScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
