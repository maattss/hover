import React from 'react';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import { Colors } from '../theme';
import { RootTabParamList } from '../types/navigationTypes';
import ExploreNavigator from './ExploreNavigator';
import FeedNavigator from './FeedNavigator';
import StatisticsNavigator from './StatisticsNavigator';
import TrackingNavigator from './TrackingNavigator';
import ProfileNavigator from './ProfileNavigator';
import useTracking from '../hooks/useTracking';
import ChallengeNavigator from './ChallengeNavigator';

const TabIcon = (props: { name: string; color: string }) => {
  return <FAIcon style={styles.tabicon} {...props} />;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const TabNavigator: React.FC = () => {
  const tracking = useTracking();

  const tabIconHome = ({ color = '' as string }) => <TabIcon name="home" color={color} />;
  const tabIconExplore = ({ color = '' as string }) => <TabIcon name="map" color={color} />;
  const tabIconChallenge = ({ color = '' as string }) => <TabIcon name="map" color={color} />;
  const tabIconStatistics = ({ color = '' as string }) => <TabIcon name="chart-bar" color={color} />;
  const tabIconTracking = ({ color = '' as string }) => <TabIcon name="location-arrow" color={color} />;
  const tabIconProfile = ({ color = '' as string }) => <TabIcon name="user" color={color} />;

  return (
    <>
      <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.blue, keyboardHidesTabBar: true }}>
        <Tab.Screen
          name="Feed"
          component={FeedNavigator}
          options={{
            tabBarIcon: tabIconHome,
          }}
        />

        <Tab.Screen
          name="Explore"
          component={ExploreNavigator}
          options={{
            tabBarIcon: tabIconExplore,
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
          component={TrackingNavigator}
          options={{
            tabBarIcon: tabIconTracking,
            tabBarBadge: tracking.isTracking && !tracking.isTrackingPaused ? '' : undefined,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: tabIconProfile,
          }}
        />

        <Tab.Screen
          name="Leaderboard"
          component={StatisticsNavigator}
          options={{
            tabBarIcon: tabIconStatistics,
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  tabicon: {
    fontSize: 25,
    marginBottom: -3,
  },
});

export default TabNavigator;
