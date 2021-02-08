import { Dispatch, SetStateAction } from 'react';
import { OngoingChallengesScreenProps } from '../screens/challenge/OngoingChallengesScreen';
import { PendingChallengesScreenProps } from '../screens/challenge/PendingChallengesScreen';
import { Challenge_Participant_Insert_Input } from './types';

export type RootStackParamList = {
  Main: undefined;
  Auth: undefined;
  Loading: undefined;
};

export type RootTabParamList = {
  Feed: undefined;
  Challenge: undefined;
  Hover: undefined;
  Profile: undefined;
  Leaderboard: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
} & NotificationsStackParamList;

export type NotificationsStackParamList = {
  Notifications: undefined;
};
export type ChallengeStackParamList = {
  Challenge: undefined;
  PendingChallenges: PendingChallengesScreenProps;
  OngoingChallenges: OngoingChallengesScreenProps;
  NewChallenge: { user_id?: string };
  PickUsers: {
    user_id?: string;
    participants: Challenge_Participant_Insert_Input[];
    setParticipants: Dispatch<SetStateAction<Challenge_Participant_Insert_Input[]>>;
  };
};
export type HoverStackParamList = {
  Explore: undefined;
  Tracking: undefined;
  Publish: undefined;
};
export type StatisticsStackParamList = {
  Leaderboard: undefined;
};
export type ProfileStackParamList = {
  Profile: undefined;
} & SettingsNavigationStackParamList;

export type SettingsNavigationStackParamList = {
  Settings: undefined;
  'User Information': undefined;
  About: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
