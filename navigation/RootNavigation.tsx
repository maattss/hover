import React from 'react';
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
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

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
    <View>
      <View>
        <Text>We need your permission</Text>
        <Text>To monitor your activity, we need access to background location.</Text>
      </View>
      {!permission ? (
        <ActivityIndicator />
      ) : (
        <View>
          <TouchableOpacity onPress={askPermission}>
            <Text>Grant permission</Text>
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
