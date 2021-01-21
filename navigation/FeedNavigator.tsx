import React from 'react';
import { FeedStackParamList, FeedTopTabStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YourFeedScreen from '../screens/feed/YourFeedScreen';
import FollowingFeedScreen from '../screens/feed/FollowingFeedScreen';
import NotificationsScreen from '../screens/feed/NotificationsScreen';
import { Typography } from '../theme';

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
          headerRight: () => <HeaderIcon name="bell" onPress={() => navigation.navigate('Notifications')} />,
        })}
      />
      <FeedStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: 'Notifications',
        }}
      />
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
    ...Typography.icon,
    marginRight: 10,
  },
});
