import { ListUserFragmentFragment } from '../graphql/Fragments.generated';
import { ChallengeRules } from './challengeTypes';
import { Challenge_Type_Enum } from './types';

export type RootStackParamList = {
  Main: undefined;
  Disclaimer: undefined;
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
  UserProfile: { user_id: string; titleName: string };
} & NotificationsStackParamList;

export type NotificationsStackParamList = {
  Notifications: undefined;
};
export type ChallengeStackParamList = {
  Challenge: undefined;
  PendingChallenges: {
    user_id: string;
  };
  OngoingChallenges: {
    user_id: string;
  };
  NewChallenge: undefined;
};

export type NewChallengeStackParamList = {
  PickUsers: {
    user_id: string;
  };
  ChallengeType: {
    user_id: string;
    participants: ListUserFragmentFragment[];
  };
  ChallengeRules: {
    user_id: string;
    participants: ListUserFragmentFragment[];
    challenge_type: Challenge_Type_Enum;
  };
  NewChallengeOverview: {
    user_id: string;
    challenge_type: Challenge_Type_Enum;
    rules: ChallengeRules;
    end_date: string;
    participants: ListUserFragmentFragment[];
  };
  ChallengeInfo: undefined;
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
  'Edit Profile': undefined;
  'Privacy Policy': undefined;
  About: undefined;
};
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
