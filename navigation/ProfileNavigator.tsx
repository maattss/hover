import React from 'react';
import { ProfileStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import UserSettingsScreen from '../screens/profile/settings/UserSettingsScreen';
import AboutScreen from '../screens/profile/settings/AboutScreen';
import SettingsScreen from '../screens/profile/settings/SettingsMenuScreen';
import { HeaderIcon } from '../components/general/HeaderIcon';

const ProfileStack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: 'Profile',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="cog" onPress={() => navigation.navigate('Settings')} />,
        })}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <ProfileStack.Screen name="User Information" component={UserSettingsScreen} />
      <ProfileStack.Screen name="About" component={AboutScreen} />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
