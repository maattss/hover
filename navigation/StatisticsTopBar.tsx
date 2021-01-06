import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeaderboardScreen from '../screens/statistics/LeaderboardScreen';
import YourStatisticsScreen from '../screens/statistics/YourStatisticsScreen';

const TopTab = createMaterialTopTabNavigator();

const StatisticsTopBar: React.FC = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <TopTab.Screen name="Your Statistics" component={YourStatisticsScreen} />
    </TopTab.Navigator>
  );
};

export default StatisticsTopBar;
