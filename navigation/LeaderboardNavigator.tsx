import React from 'react';
import LeaderboardScreen from '../screens/leaderboard/LeaderboardScreen';

import { StatisticsStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AchievementScreen from '../screens/profile/AchievementScreen';

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
      <StatisticsStack.Screen
        name="Achievements"
        component={AchievementScreen}
        options={({ route }) => ({
          title: `${route.params.titleName}'s Achievements`,
        })}
      />
    </StatisticsStack.Navigator>
  );
};
export default StatisticsNavigator;
