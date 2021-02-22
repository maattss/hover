import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import useAuthentication from '../hooks/useAuthentication';
import { FeedStackParamList, RootTabParamList } from '../types/navigationTypes';

type BottomNavigationProp = BottomTabNavigationProp<RootTabParamList>;
type FeedNavigationProp = StackNavigationProp<FeedStackParamList>;

type Props = {
  children: React.ReactChild;
  user_id: string;
  title?: string;
};

const ProfileButton: React.FC<Props> = ({ user_id, children, title }: Props) => {
  const bottomNavigation = useNavigation<BottomNavigationProp>();
  const id = useAuthentication().user?.uid;
  const feedNavigation = useNavigation<FeedNavigationProp>();
  const navigate = () => {
    if (user_id == id) {
      bottomNavigation.navigate('Profile');
    } else {
      feedNavigation.navigate('UserProfile', {
        user_id: user_id,
      });
    }
  };
  return <TouchableOpacity onPress={() => navigate()}>{children}</TouchableOpacity>;
};

export default ProfileButton;
