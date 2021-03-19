import { ListUserFragmentFragment } from '../graphql/Fragments.generated';
import { ChallengeRules } from './challengeTypes';
import { UserProfile } from './profileTypes';
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
} & UserProfileStackParamList &
  NotificationsStackParamList;

export type NotificationsStackParamList = {
  Notifications: undefined;
};

export type ChallengeStackParamList = {
  Challenge: undefined;
  NewChallenge: undefined;
  PendingChallenges: {
    user_id: string;
  };
  OngoingChallenges: {
    user_id: string;
  };
} & UserProfileStackParamList;

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
} & UserProfileStackParamList;

export type ProfileStackParamList = {
  Profile: undefined;
} & UserProfileStackParamList &
  SettingsNavigationStackParamList;

export type UserProfileStackParamList = {
  UserProfile: { user_id: string; titleName: string };
  Achievements: { user_id: string; userProfile: UserProfile; titleName: string };
};
export type SettingsNavigationStackParamList = {
  Settings: undefined;
  'Edit Profile': undefined;
  'Privacy Policy': undefined;
  'About Hover': undefined;
  SuggestGeofence: undefined;
  Feedback: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};
