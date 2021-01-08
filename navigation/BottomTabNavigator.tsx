import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import MapScreen from '../screens/explore/MapScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import { BottomTabParamList, TabOneParamList, TabThreeParamList, TabTwoParamList } from '../types';
import StatisticsScreen from '../screens/statistics/StatisticsScreen';
import { Colors } from '../theme';
import SettingsScreen from '../screens/settings/SettingsScreen';
import UserSettingsScreen from '../screens/settings/UserSettingsScreen';

const TabBarIcon = (props: { name: string; color: string }) => {
  return <FAIcon style={styles.tabicon} {...props} />;
};

const HeaderIcon = (props: { name: string; onPress: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};

const TabOneStack = createStackNavigator<TabOneParamList>();

const TabOneNavigator: React.FC = () => {
  return (
    <TabOneStack.Navigator initialRouteName="Feed">
      <TabOneStack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon onPress={() => navigation.navigate('Settings')} name="cog" />,
        })}
      />
      <TabOneStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: 'Settings',
        }}
      />
      <TabOneStack.Screen
        name="UserSettings"
        component={UserSettingsScreen}
        options={{
          headerTitle: 'UserSettings',
        }}
      />
    </TabOneStack.Navigator>
  );
};

const TabTwoStack = createStackNavigator<TabTwoParamList>();

const TabTwoNavigator: React.FC = () => {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={MapScreen}
        options={{ headerTitle: 'Explore', headerShown: false }}
      />
    </TabTwoStack.Navigator>
  );
};

const TabThreeStack = createStackNavigator<TabThreeParamList>();

const TabThreeNavigator: React.FC = () => {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={StatisticsScreen}
        options={{ headerTitle: 'Statistics' }}
      />
    </TabThreeStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const tabBarIconHome = ({ color = '' as string }) => <TabBarIcon name="home" color={color} />;
  const tabBarIconNavigate = ({ color = '' as string }) => <TabBarIcon name="location-arrow" color={color} />;
  const tabBarIconStats = ({ color = '' as string }) => <TabBarIcon name="chart-bar" color={color} />;

  return (
    <BottomTab.Navigator initialRouteName="Feed" tabBarOptions={{ activeTintColor: Colors.blue }}>
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
          tabBarIcon: tabBarIconNavigate,
        }}
      />
      <BottomTab.Screen
        name="Statistics"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: tabBarIconStats,
        }}
      />
    </BottomTab.Navigator>
  );
};

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

export default BottomTabNavigator;
