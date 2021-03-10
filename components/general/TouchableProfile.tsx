import React from 'react';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import useAuthentication from '../../hooks/useAuthentication';
import {
  ChallengeStackParamList,
  FeedStackParamList,
  RootTabParamList,
  NotificationsStackParamList,
  ProfileStackParamList,
  StatisticsStackParamList,
  OngoingChallengesStackParamList,
  PendingChallengesStackParamList,
} from '../../types/navigationTypes';

type BottomNavigationProp = BottomTabNavigationProp<RootTabParamList>;
type FeedNavigationProp = StackNavigationProp<FeedStackParamList>;
type ChallengeNavigationProp = StackNavigationProp<ChallengeStackParamList>;
type NotificationsNavigationProp = StackNavigationProp<NotificationsStackParamList>;
type ProfileNavigationProp = StackNavigationProp<ProfileStackParamList>;
type StatisticsNavigationProp = StackNavigationProp<StatisticsStackParamList>;
type OngoingChallengeNavigationProp = StackNavigationProp<OngoingChallengesStackParamList>;
type PendingChallengeNavigationProp = StackNavigationProp<PendingChallengesStackParamList>;

type backScreen =
  | 'Feed'
  | 'Challenge'
  | 'PendingChallenge'
  | 'OngoingChallenge'
  | 'Notifications'
  | 'Leaderboard'
  | 'Profile';

type Props = {
  children: React.ReactChild;
  user_id: string;
  name: string;
  onPress?: () => void;
  backScreen?: backScreen;
};

const TouchableProfile: React.FC<Props> = ({ user_id, children, name, onPress, backScreen }: Props) => {
  const bottomNavigation = useNavigation<BottomNavigationProp>();
  const id = useAuthentication().user?.uid;

  const navigate = () => {
    if (user_id == id) {
      bottomNavigation.navigate('Profile');
    } else {
      if (!backScreen) backScreen = 'Feed';
      navigateTo(backScreen, user_id, name);
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

const navigateTo = (backScreen: backScreen, userId: string, name: string) => {
  if (backScreen === 'Feed') {
    useNavigation<FeedNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
  if (backScreen === 'Challenge') {
    useNavigation<FeedNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
  if (backScreen === 'OngoingChallenge') {
    useNavigation<OngoingChallengeNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
  if (backScreen === 'PendingChallenge') {
    useNavigation<PendingChallengeNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
  if (backScreen === 'Leaderboard') {
    useNavigation<StatisticsNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
  if (backScreen === 'Notifications') {
    useNavigation<NotificationsNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
  if (backScreen === 'Profile') {
    useNavigation<ProfileNavigationProp>().navigate('UserProfile', {
      user_id: userId,
      titleName: name,
    });
    return;
  }
};

export default TouchableProfile;
