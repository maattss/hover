import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeaderboardScreen from '../screens/statistics/LeaderboardScreen/LeaderboardScreen';
import YourStatisticsScreen from '../screens/statistics/YourStatisticsScreen/YourStatisticsScreen';

const TopTab = createMaterialTopTabNavigator();

export default function StatisticsTopBar() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <TopTab.Screen name="Your Statistics" component={YourStatisticsScreen} />
    </TopTab.Navigator>
  );
}
