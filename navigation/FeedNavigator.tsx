import React from 'react';
import { FeedStackParamList, FeedTopTabStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import UserSettingsScreen from '../screens/settings/UserSettingsScreen';
import AboutScreen from '../screens/settings/AboutScreen';
import SettingsScreen from '../screens/settings/SettingsMenuScreen';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YourFeedScreen from '../screens/feed/YourFeedScreen';
import FollowingFeedScreen from '../screens/feed/FollowingFeedScreen';

const HeaderIcon = (props: { name: string; onPress: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};
const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedTopBar}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="cog" onPress={() => navigation.navigate('Settings Menu')} />,
        })}
      />
      <FeedStack.Screen
        name="Settings Menu"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <FeedStack.Screen name="User Settings" component={UserSettingsScreen} />
      <FeedStack.Screen name="About" component={AboutScreen} />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;

const TopTab = createMaterialTopTabNavigator<FeedTopTabStackParamList>();

const FeedTopBar: React.FC = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Following" component={FollowingFeedScreen} />
      <TopTab.Screen name="You" component={YourFeedScreen} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  headericon: {
    fontSize: 25,
    marginRight: 10,
  },
});
