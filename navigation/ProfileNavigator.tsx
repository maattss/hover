import React from 'react';
import { ProfileStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AboutScreen from '../screens/profile/settings/AboutScreen';
import SettingsScreen from '../screens/profile/settings/SettingsMenuScreen';
import { HeaderIcon } from '../components/general/HeaderIcon';
import PrivacyScreen from '../screens/profile/settings/PrivacyScreen';
import EditProfileScreen from '../screens/profile/settings/EditProfileScreen';

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
      <ProfileStack.Screen name="Edit Profile" component={EditProfileScreen} />
      <ProfileStack.Screen name="About Hover" component={AboutScreen} />
      <ProfileStack.Screen name="Privacy Policy" component={PrivacyScreen} />
      <ProfileStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: `${route.params.titleName}'s Profile`,
        })}
      />
    </ProfileStack.Navigator>
  );
};

export default ProfileNavigator;
