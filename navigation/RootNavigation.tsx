import React from 'react';
import React, { useState, useEffect } from 'react';
import { LOCATION, usePermissions } from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { LOCATION, usePermissions } from 'expo-permissions';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigationTypes';
import TabNavigator from './TabNavigator';
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import LoadingScreen from '../screens/auth/LoadingScreen';
import useAuthentication from '../hooks/useAuthentication';
import { DarkTheme } from '../theme/colors';
import NotifyWithinAreaTask from '../tasks/NotifyWithinAreaTask';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Buttons } from '../theme';

export const RootStack = createStackNavigator<RootStackParamList>();

const MainContainer: React.FC = () => {
  const [permission, askPermission] = usePermissions(LOCATION);

  if (permission?.granted) {
    return (
      <>
        <NotifyWithinAreaTask />
        <TabNavigator />
      </>
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.box}>
        <Text style={styles.title}>We need your permission</Text>
        <Text style={styles.paragraph}>To monitor your activity, we need access to background location.</Text>
      </View>
      {!permission ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.center}>
          <TouchableOpacity onPress={askPermission}>
            <Text style={{ ...Buttons.buttonText }}>Grant permission</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.background,
    padding: 4,
  },
  box: {
    paddingVertical: 1,
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  paragraph: {
    fontSize: 18,
    lineHeight: 26,
    paddingVertical: 6,
  },
  button: {
    color: 'white',
    fontFamily: 'open-sans',
    fontWeight: 'bold',
  },
  buttons: {
    backgroundColor: 'black',
    borderRadius: 2,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
});
