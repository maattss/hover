import React from 'react';
import { ProfileStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';

const ExploreStack = createStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Profile" component={ProfileScreen} />
    </ExploreStack.Navigator>
  );
};

export default ProfileNavigator;
