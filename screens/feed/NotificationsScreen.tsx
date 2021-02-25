import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Spacing, Typography } from '../../theme';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { NotificationFragmentFragment } from '../../graphql/Fragments.generated';
import { useNotifiactionsQuery } from '../../graphql/queries/Notifications.generated';
import { getNotificationTitle } from '../../helpers/notificationHelpers';

const NotificationsScreen: React.FC = () => {
  const [notifications, setNotification] = useState<NotificationFragmentFragment[]>([]);

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
        setNotification(newNotification);
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
  const renderItem = (item: NotificationFragmentFragment) => (
    <View style={{ marginHorizontal: Spacing.smaller }}>
      <Text style={{ ...Typography.bodyText }}>{getNotificationTitle(item.type)}</Text>
    </View>
  );
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
