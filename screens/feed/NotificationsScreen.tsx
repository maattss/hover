import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Spacing, Typography } from '../../theme';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { NotificationFragmentFragment } from '../../graphql/Fragments.generated';
import { useNotifiactionsQuery } from '../../graphql/queries/Notifications.generated';
import NotificationCard from '../../components/feed/notification/NotificationCard';

const NotificationsScreen: React.FC = () => {
  const allData = {
    data: {
      notifications: [
        {
          id: 3,
          type: 'CHALLENGE_CLOSED',
          text:
            'Your score in category challenge have been closed due to insuficient  number of participants. This may be because some participants have declined your challenge.',
          seen: false,
          user_id: 'klvKqLVwByQbnFiEID8gjtHlvjD3',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
        {
          id: 2,
          type: 'CHALLENGE_EXPIRED',
          text: 'Your challenge expired.',
          seen: false,
          user_id: 't1Kg1gYha8hwez4Wzqs1Kvr9FXf2',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
        {
          id: 90,
          type: 'CHALLENGE_FINISHED',
          text: 'Ronny invited you to a time in category challenge.',
          seen: false,
          user_id: 'uqoRoWbmv7P457uvGk9IbX8sH143',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
        {
          id: 9,
          type: 'CHALLENGE_INVITE',
          text: 'Ronny invited you to a time in category challenge.',
          seen: false,
          user_id: 'uqoRoWbmv7P457uvGk9IbX8sH143',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
        {
          id: 14,
          type: 'CHALLENGE_WON',
          text: 'You won a challenge',
          seen: true,
          user_id: 'Srnquo5AgrfB1S8FD6PvdhoZLwe2',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
        {
          id: 17,
          type: 'NEW_ACHIEVEMENT',
          text: 'You achieved a new achievement! Check it out in the feed or your profile page!',
          seen: false,
          user_id: 'UV8a00JBWUh3XAilTq60MElESfy2',
          created_at: '2021-02-25T14:26:19.036395+00:00',
        },
        {
          id: 1,
          type: 'PARTICIPANT_UPDATE',
          text: 'Siri Mykland accepted your time challenge.',
          seen: false,
          user_id: 't1Kg1gYha8hwez4Wzqs1Kvr9FXf2',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
      ],
    },
  };

  const [notifications, setNotification] = useState<NotificationFragmentFragment[]>(
    allData.data.notifications as NotificationFragmentFragment[],
  );
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { data, loading, error, fetchMore } = useNotifiactionsQuery({
    variables: { limit: limit, offset: offset },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.notifications) {
      if (data.notifications.length == 0) {
        setEndReached(true);
      } else {
        const newNotification: NotificationFragmentFragment[] = notifications;
        data.notifications.forEach((obj: NotificationFragmentFragment) => {
          newNotification.push(obj);
        });
        //setNotification(newNotification);
      }
    }
  }, [data]);

  const loadMore = () => {
    if (!endReached && !loading) {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchMore({
        variables: {
          limit: limit,
          offset: newOffset,
        },
      });
    }
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Notifications</Text>
    </View>
  );
  const renderItem = (item: NotificationFragmentFragment) => <NotificationCard notification={item} />;
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? <Loading /> : null}
        {endReached ? (
          <Text style={{ ...Typography.bodyText }}>
            {notifications.length > 0 ? 'There are no more notifications.' : 'You have no notifications'}
          </Text>
        ) : null}
      </View>
    );
  };

  if (error) return <Error message={error.message} apolloError={error} />;

  return (
    <FlatList
      data={notifications}
      bounces={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => renderItem(item)}
      onEndReachedThreshold={0.5}
      onEndReached={loadMore}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: Spacing.base,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardbox: {
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
});
export default NotificationsScreen;
