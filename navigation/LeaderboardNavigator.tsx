import React from 'react';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';

import { StatisticsStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';

const StatisticsStack = createStackNavigator<StatisticsStackParamList>();
const StatisticsNavigator: React.FC = () => {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="Leaderboard" component={LeaderboardScreen} />
      <StatisticsStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: `${route.params.titleName}'s Profile`,
        })}
      />
    </StatisticsStack.Navigator>
  );
};
export default StatisticsNavigator;
