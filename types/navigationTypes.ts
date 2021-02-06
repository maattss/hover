import { OngoingChallengesScreenProps } from '../screens/challenge/OngoingChallengesScreen';
import { PendingChallengesScreenProps } from '../screens/challenge/PendingChallengesScreen';

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
  NewChallenge: undefined;
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
  'User Settings': undefined;
  About: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
