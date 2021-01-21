import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeaderboardScreen from '../screens/statistics/LeaderboardScreen';
import YourStatisticsScreen from '../screens/statistics/YourStatisticsScreen';
import { StatisticsStackParamList, StatisticsTopTabStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';

const StatisticsStack = createStackNavigator<StatisticsStackParamList>();
const StatisticsNavigator: React.FC = () => {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="Leaderboard" component={StatisticsTopBar} />
    </StatisticsStack.Navigator>
  );
};
export default StatisticsNavigator;

const TopTab = createMaterialTopTabNavigator<StatisticsTopTabStackParamList>();
const StatisticsTopBar: React.FC = () => {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Your Statistics" component={YourStatisticsScreen} />
      <TopTab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </TopTab.Navigator>
  );
};
