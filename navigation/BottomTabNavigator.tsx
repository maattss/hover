import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MapScreen from '../screens/explore/MapScreen/MapScreen';
import FeedScreen from '../screens/feed/FeedScreen/FeedScreen';
import {
  BottomTabParamList,
  TabOneParamList,
  TabThreeParamList,
  TabTwoParamList,
} from '../types';
import StatisticsScreen from '../screens/statistics/StatisticsScreen/StatisticsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen/SettingsScreen';

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
          headerRight: () => (
            <HeaderIcon
              onPress={() => navigation.navigate('Settings')}
              name="ios-settings"
            />
          ),
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
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={MapScreen}
        options={{ headerTitle: 'Explore' }}
      />
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

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Feed"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-home" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-navigate" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-stats" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
