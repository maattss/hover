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
  Settings: undefined;
};
export type ExploreStackParamList = {
  Explore: undefined;
};
export type StatisticsStackParamList = {
  Statistics: undefined;
};

export type FeedTopTabStackParamList = {
  Following: undefined;
  You: undefined;
};
export type SettingsNavigationStackParamList = {
  'User Settings': undefined;
  About: undefined;
};
export type ExploreNavigationStackParamList = {
  Map: undefined;
};
export type StatisticsTopTabStackParamList = {
  Leaderboard: undefined;
  'Your Statistics': undefined;
};

export type Location = {
  latitude: number;
  longitude: number;
};
