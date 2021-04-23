import React from 'react';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Colors } from '../theme';
import { RootTabParamList } from '../types/navigationTypes';
import FeedNavigator from './FeedNavigator';
import StatisticsNavigator from './LeaderboardNavigator';
import HoverNavigator from './HoverNavigator';
import ProfileNavigator from './ProfileNavigator';
import useTracking from '../hooks/useTracking';
import ChallengeNavigator from './ChallengeNavigator';
import { TrackingState } from '../components/providers/TrackingProvider';

const TabIcon = (props: { name: string; color: string }) => {
  return <FAIcon style={styles.tabicon} {...props} />;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator: React.FC = () => {
  const tracking = useTracking();

  const tabIconHome = ({ color = '' as string }) => <TabIcon name="home" color={color} />;
  const tabIconChallenge = ({ color = '' as string }) => <TabIcon name="users" color={color} />;
  const tabIconStatistics = ({ color = '' as string }) => <TabIcon name="chart-bar" color={color} />;
  const tabIconTracking = ({ color = '' as string }) => <TabIcon name="location-arrow" color={color} />;
  const tabIconProfile = ({ color = '' as string }) => <TabIcon name="user-alt" color={color} />;

  return (
    <Tab.Navigator
      tabBarOptions={{ activeTintColor: Colors.blue, keyboardHidesTabBar: true }}
      initialRouteName={'Hover'}>
      <Tab.Screen
        name="Feed"
        component={FeedNavigator}
        options={{
          tabBarIcon: tabIconHome,
        }}
      />
      <Tab.Screen
        name="Challenge"
        component={ChallengeNavigator}
        options={{
          tabBarIcon: tabIconChallenge,
        }}
      />
      <Tab.Screen
        name="Hover"
        component={HoverNavigator}
        options={{
          tabBarIcon: tabIconTracking,
          tabBarBadge: tracking.trackingState === TrackingState.TRACKING ? '' : undefined,
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={StatisticsNavigator}
        options={{
          tabBarIcon: tabIconStatistics,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{
          tabBarIcon: tabIconProfile,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabicon: {
    fontSize: 25,
    marginBottom: -3,
  },
});

export default TabNavigator;
