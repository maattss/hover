import React from 'react';
import { FeedStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import NotificationsScreen from '../screens/feed/NotificationsScreen';
import { Typography } from '../theme';
import FeedScreen from '../screens/feed/FeedScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import BadgeIcon from '../components/general/BadgeIcon';
import { useNotificationCountQuery } from '../graphql/queries/NotificationCount.generated';

export const HeaderIcon = (props: { name: string; onPress?: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};
const FeedStack = createStackNavigator<FeedStackParamList>();

const FeedNavigator: React.FC = () => {
  const { data, refetch } = useNotificationCountQuery({ nextFetchPolicy: 'network-only' });
  return (
    <FeedStack.Navigator>
      <FeedStack.Screen
        name="Feed"
        component={FeedScreen}
        options={({ navigation }) => ({
          headerTitle: 'Feed',
          // eslint-disable-next-line react/display-name
          headerRight: () => (
            <BadgeIcon
              value={data?.notifications_aggregate.aggregate?.count ?? 0}
              onPress={() => navigation.navigate('Notifications')}>
              <HeaderIcon name="bell" />
            </BadgeIcon>
          ),
        })}
        initialParams={{ refreshNotification: refetch }}
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

const styles = StyleSheet.create({
  headericon: {
    ...Typography.icon,
    marginRight: 20,
  },
});
