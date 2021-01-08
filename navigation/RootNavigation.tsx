import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from 'firebase';
import Firebase from '../lib/firebase';

import { RootStackParamList } from '../types/navigationTypes';
import TabNavigator from './TabNavigator';
import SignupScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';

export const RootStack = createStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  const [userAuthState, setUserAuthState] = useState<User | null>(null);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserAuthState(user);
      } else {
        setUserAuthState(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {userAuthState ? (
          <RootStack.Screen name="Main" component={TabNavigator} />
        ) : (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
