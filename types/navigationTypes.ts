export type RootStackParamList = {
  Main: undefined;
  Signup: undefined;
  Login: undefined;
  Loading: undefined;
};

export type RootTabParamList = {
  Home: undefined;
  Explore: undefined;
  Hover: undefined;
  Profile: undefined;
  Leaderboard: undefined;
};

export type FeedStackParamList = {
  Home: undefined;
} & NotificationsStackParamList;

export type NotificationsStackParamList = {
  Notifications: undefined;
};

export type ExploreStackParamList = {
  Explore: undefined;
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

export type FeedTopTabStackParamList = {
  Following: undefined;
  You: undefined;
};

export type StatisticsTopTabStackParamList = {
  Leaderboard: undefined;
  'Your Statistics': undefined;
};
