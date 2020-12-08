import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YourFeedScreen from '../screens/feed/YourFeedScreen/YourFeedScreen';
import FollowingFeedScreen from '../screens/feed/FollowingFeedScreen/FollowingFeedScreen';

const TopTab = createMaterialTopTabNavigator();

export default function FeedTopBar() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Following" component={FollowingFeedScreen} />
      <TopTab.Screen name="You" component={YourFeedScreen} />
    </TopTab.Navigator>
  );
}
