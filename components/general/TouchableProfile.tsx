import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import useAuthentication from '../../hooks/useAuthentication';
import { ProfileStackParamList, RootTabParamList } from '../../types/navigationTypes';

type BottomNavigationProp = BottomTabNavigationProp<RootTabParamList>;
type ProfileNavigationProp = BottomTabNavigationProp<ProfileStackParamList>;

type Props = {
  children: React.ReactChild;
  user_id: string;
  name: string;
  onPress?: () => void;
};

const TouchableProfile: React.FC<Props> = ({ user_id, children, name, onPress }: Props) => {
  const bottomNavigation = useNavigation<BottomNavigationProp>();
  const id = useAuthentication().user?.uid;
  const navigation = useNavigation();
  const profileNavigator = useNavigation<ProfileNavigationProp>();

  const navigate = () => {
    if (user_id == id) {
      bottomNavigation.navigate('Profile');
      profileNavigator.reset({
        routes: [{ name: 'Profile' }],
      });
    } else {
      navigation.navigate('UserProfile', {
        user_id: user_id,
        titleName: name,
      });
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
        navigate();
      }}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableProfile;
