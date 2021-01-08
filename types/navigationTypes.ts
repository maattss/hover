export type RootStackParamList = {
  Main: undefined;
  Signup: undefined;
  Login: undefined;
};

export type RootTabParamList = {
  Feed: undefined;
  Explore: undefined;
  Statistics: undefined;
};

export type FeedStackParamList = {
  Feed: undefined;
} & SettingsNavigationStackParamList;

export type ExploreStackParamList = {
  Map: undefined;
};
export type StatisticsStackParamList = {
  Statistics: undefined;
};

export type FeedTopTabStackParamList = {
  Following: undefined;
  You: undefined;
};
export type SettingsNavigationStackParamList = {
  'Settings Menu': undefined;
  'User Settings': undefined;
  About: undefined;
};
export type StatisticsTopTabStackParamList = {
  Leaderboard: undefined;
  'Your Statistics': undefined;
};
