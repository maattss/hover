import React from 'react';
import LeaderboardScreen from '../screens/statistics/LeaderboardScreen';

import { StatisticsStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';

const StatisticsStack = createStackNavigator<StatisticsStackParamList>();
const StatisticsNavigator: React.FC = () => {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="Leaderboard" component={LeaderboardScreen} />
    </StatisticsStack.Navigator>
  );
};
export default StatisticsNavigator;
