import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import useAuthentication from '../../hooks/useAuthentication';
import { RootTabParamList } from '../../types/navigationTypes';

type BottomNavigationProp = BottomTabNavigationProp<RootTabParamList>;

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

  const navigate = () => {
    if (user_id == id) {
      bottomNavigation.navigate('Profile');
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
