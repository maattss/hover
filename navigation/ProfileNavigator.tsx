import React from 'react';
import { ProfileStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import UserSettingsScreen from '../screens/profile/settings/UserSettingsScreen';
import AboutScreen from '../screens/profile/settings/AboutScreen';
import SettingsScreen from '../screens/profile/settings/SettingsMenuScreen';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Typography } from '../theme';

const HeaderIcon = (props: { name: string; onPress: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};
const ExploreStack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerTitle: 'Profile',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="cog" onPress={() => navigation.navigate('Settings')} />,
        })}
      />
      <ExploreStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <ExploreStack.Screen name="User Information" component={UserSettingsScreen} />
      <ExploreStack.Screen name="About" component={AboutScreen} />
    </ExploreStack.Navigator>
  );
};
const styles = StyleSheet.create({
  headericon: {
    ...Typography.icon,
    marginRight: 10,
  },
});

export default ProfileNavigator;
