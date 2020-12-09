import React, { useState, useEffect } from 'react';
import { ColorSchemeName } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from 'firebase';

import Firebase from '../lib/firebase';

import { RootStackParamList, AuthenticationStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

import SignupScreen from '../screens/auth/SignUpScreen/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen/LoginScreen';
import NotFoundScreen from '../screens/notFound/NotFoundScreen/NotFoundScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthenticationStack = createStackNavigator<AuthenticationStackParamList>();

function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
}

function AuthenticationNavigator() {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Login" component={LoginScreen} />
      <AuthenticationStack.Screen name="Signup" component={SignupScreen} />
    </AuthenticationStack.Navigator>
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
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
    <NavigationContainer linking={LinkingConfiguration} theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
      {/* {userAuthState && <RootNavigator />}
      {!userAuthState && <AuthenticationNavigator />} */}
    </NavigationContainer>
  );
}
