import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapScreen from '../screens/explore/MapScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import { BottomTabParamList, TabOneParamList, TabThreeParamList, TabTwoParamList } from '../types';
import StatisticsScreen from '../screens/statistics/StatisticsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import { useTheme } from '../theme/ThemeProvider';

const styles = StyleSheet.create({
  headericon: {
    fontSize: 25,
    marginRight: 10,
  },
  tabicon: {
    fontSize: 30,
    marginBottom: -3,
  },
});

function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons style={styles.tabicon} {...props} />;
}

function HeaderIcon(props: { name: string; onPress: () => void }) {
  return <Ionicons style={styles.headericon} {...props} />;
}

const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator initialRouteName="Feed">
      <TabOneStack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon onPress={() => navigation.navigate('Settings')} name="ios-settings" />,
        })}
      />
      <TabOneStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          gestureEnabled: false,
          headerTitle: 'Settings',
        }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen name="TabTwoScreen" component={MapScreen} options={{ headerTitle: 'Explore' }} />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={StatisticsScreen}
        options={{ headerTitle: 'Statistics' }}
      />
    </TabThreeStack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const { colors } = useTheme();
  const tabBarIconHome = ({ color = '' as string }) => <TabBarIcon name="ios-home" color={color} />;
  const tabBarIconStats = ({ color = '' as string }) => <TabBarIcon name="ios-stats" color={color} />;
  const tabBarIconNavigate = ({ color = '' as string }) => <TabBarIcon name="ios-navigate" color={color} />;

  return (
    <BottomTab.Navigator initialRouteName="Feed" tabBarOptions={{ activeTintColor: colors.primary }}>
      <BottomTab.Screen
        name="Feed"
        component={TabOneNavigator}
        options={{
          tabBarIcon: tabBarIconHome,
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: tabBarIconStats,
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: tabBarIconNavigate,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
