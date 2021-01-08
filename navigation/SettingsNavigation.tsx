import React from 'react';
import { SettingsStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import UserSettingsScreen from '../screens/settings/UserSettingsScreen';
import AboutScreen from '../screens/settings/AboutScreen';

const SettingsStack = createStackNavigator<SettingsStackParamList>();

const SettingsNavigation: React.FC = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="User Settings" component={UserSettingsScreen} />
      <SettingsStack.Screen name="About" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigation;
