import React from 'react';
import { FeedStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationsScreen from '../screens/feed/NotificationsScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BadgeIcon from '../components/general/BadgeIcon';
import useNotification from '../hooks/useNotification';
import { HeaderIcon } from '../components/general/HeaderIcon';

const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => {
  const { count } = useNotification();
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <BadgeIcon value={count} onPress={() => navigation.navigate('Notifications')}>
              <HeaderIcon name="bell" />
            </BadgeIcon>
          ),
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
        options={({ route }) => ({
          title: `${route.params.titleName}'s Profile`,
        })}
      />
    </FeedStack.Navigator>
  );
};

export default FeedNavigator;
