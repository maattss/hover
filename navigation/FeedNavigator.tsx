import React from 'react';
import { FeedStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import NotificationsScreen from '../screens/feed/NotificationsScreen';
import { Typography } from '../theme';
import FeedScreen from '../screens/feed/FeedScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

export const HeaderIcon = (props: { name: string; onPress: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};
const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => {
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="bell" onPress={() => navigation.navigate('Notifications')} />,
        })}
      />
      <FeedStack.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerTitle: 'Notifications',
        }}
      />
      <FeedStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{
          headerTitle: 'User',
        }}
      />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;

const styles = StyleSheet.create({
  headericon: {
    ...Typography.icon,
    marginRight: 20,
  },
});
