import React from 'react';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import FeedScreen from '../screens/feed/FeedScreen';
import StatisticsScreen from '../screens/statistics/StatisticsScreen';
import { Colors } from '../theme';
import { ExploreStackParamList, FeedStackParamList, RootTabParamList, StatisticsStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsNavigator from './SettingsNavigator';
import ExploreNavigator from './ExploreNavigator';

const TabIcon = (props: { name: string; color: string }) => {
  return <FAIcon style={styles.tabicon} {...props} />;
};
const HeaderIcon = (props: { name: string; onPress: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const FeedStack = createStackNavigator<FeedStackParamList>();
const ExploreStack = createStackNavigator<ExploreStackParamList>();
const StatisticsStack = createStackNavigator<StatisticsStackParamList>();

const FeedTab: React.FC = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="cog" onPress={() => navigation.navigate('Settings')} />,
        })}
      />
      <FeedStack.Screen name="Settings" component={SettingsNavigator} />
    </FeedStack.Navigator>
  );
};

const ExploreTab: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExploreNavigator} />
    </ExploreStack.Navigator>
  );
};
const StatisticsTab: React.FC = () => {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="Statistics" component={StatisticsScreen} />
    </StatisticsStack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  const tabIconHome = ({ color = '' as string }) => <TabIcon name="home" color={color} />;
  const tabIconExplore = ({ color = '' as string }) => <TabIcon name="location-arrow" color={color} />;
  const tabIconStatistics = ({ color = '' as string }) => <TabIcon name="chart-bar" color={color} />;

  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.blue }}>
      <Tab.Screen
        name="Feed"
        component={FeedTab}
        options={{
          tabBarIcon: tabIconHome,
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreTab}
        options={{
          tabBarIcon: tabIconExplore,
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={StatisticsTab}
        options={{
          tabBarIcon: tabIconStatistics,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  headericon: {
    fontSize: 25,
    marginRight: 10,
  },
  tabicon: {
    fontSize: 25,
    marginBottom: -3,
  },
});

export default TabNavigator;
