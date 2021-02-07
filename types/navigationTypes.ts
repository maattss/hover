import { OngoingChallengesScreenProps } from '../screens/challenge/OngoingChallengesScreen';
import { PendingChallengesScreenProps } from '../screens/challenge/PendingChallengesScreen';

export type RootStackParamList = {
  Main: undefined;
  Signup: undefined;
  Login: undefined;
  Loading: undefined;
};

export type RootTabParamList = {
  Feed: undefined;
  Explore: undefined;
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

export type ExploreStackParamList = {
  Explore: undefined;
};
export type ChallengeStackParamList = {
  Challenge: undefined;
  PendingChallenges: PendingChallengesScreenProps;
  OngoingChallenges: OngoingChallengesScreenProps;
  NewChallenge: { user_id?: string };
  PickUsers: { user_id?: string };
};
export type StatisticsStackParamList = {
  Leaderboard: undefined;
};
export type TrackingStackParamList = {
  Hover: undefined;
};
export type ProfileStackParamList = {
  Profile: undefined;
} & SettingsNavigationStackParamList;

export type SettingsNavigationStackParamList = {
  Settings: undefined;
  'User Settings': undefined;
  About: undefined;
};
