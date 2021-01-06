import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from 'firebase';
import Firebase from '../lib/firebase';
import { RootStackParamList, AuthenticationStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import SignupScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import NotFoundScreen from '../screens/notFound/NotFoundScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const AuthenticationStack = createStackNavigator<AuthenticationStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Root" component={BottomTabNavigator} />
      <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </RootStack.Navigator>
  );
};

const AuthenticationNavigator: React.FC = () => {
  return (
    <AuthenticationStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthenticationStack.Screen name="Login" component={LoginScreen} />
      <AuthenticationStack.Screen name="Signup" component={SignupScreen} />
    </AuthenticationStack.Navigator>
  );
};

const Navigation: React.FC = () => {
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
    <NavigationContainer linking={LinkingConfiguration}>
      {userAuthState && <RootNavigator />}
      {!userAuthState && <AuthenticationNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
