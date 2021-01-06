import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YourFeedScreen from '../screens/feed/YourFeedScreen';
import FollowingFeedScreen from '../screens/feed/FollowingFeedScreen';

const TopTab = createMaterialTopTabNavigator();

const FeedTopBar: React.FC = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Following" component={FollowingFeedScreen} />
      <TopTab.Screen name="You" component={YourFeedScreen} />
    </TopTab.Navigator>
  );
};

export default FeedTopBar;
