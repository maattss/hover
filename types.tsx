export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type AuthenticationStackParamList = {
  Signup: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  Feed: undefined;
  Explore: undefined;
  Statistics: undefined;
};

export type TabOneParamList = {
  Feed: undefined;
} & SettingsStackParamList;

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type TabThreeParamList = {
  TabThreeScreen: undefined;
};

export type SettingsStackParamList = {
  Settings: undefined;
  UserSettings: undefined;
};

export type Location = {
  latitude: number;
  longitude: number;
};
