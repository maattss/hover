import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { NotificationFragmentFragment } from '../../graphql/Fragments.generated';
import { useNotifiactionsQuery } from '../../graphql/queries/Notifications.generated';
import NotificationCard from '../../components/feed/notification/NotificationCard';
import { useUpdateNotificationsMutation } from '../../graphql/mutations/UpdateNotifications.generated';
import useAuthentication from '../../hooks/useAuthentication';
import Divider from '../../components/general/Divider';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';

type SectionItem = { title: string; innerArray?: NotificationFragmentFragment[] };

type NavigationProp = StackNavigationProp<FeedStackParamList>;
type FeedRouteProp = RouteProp<FeedStackParamList, 'Notifications'>;
export type NotificationProps = {
  navigation: NavigationProp;
  route: FeedRouteProp;
};

const NotificationsScreen: React.FC<NotificationProps> = ({ navigation, route }: NotificationProps) => {
  const [sections, setSections] = useState<SectionItem[]>();
  const user_id = useAuthentication().user?.uid ?? '';
  const [readNotifications] = useUpdateNotificationsMutation();

  const { data, loading, error } = useNotifiactionsQuery({
    fetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (data && data.notifications) {
      const newest: NotificationFragmentFragment[] = [];
      const earlier: NotificationFragmentFragment[] = [];
      data.notifications.forEach((obj: NotificationFragmentFragment) => {
        if (!obj.seen) newest.push(obj);
        else earlier.push(obj);
      });
      const tempSections: SectionItem[] = [];
      if (newest.length > 0) tempSections.push({ title: 'New', innerArray: newest });
      if (earlier.length > 0) tempSections.push({ title: 'Earlier', innerArray: earlier });
      setSections(tempSections);
    }
  }, [data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener(
      'beforeRemove',
      async () => await readNotifications({ variables: { user_id } }).then(() => route.params.refreshNotification()),
    );
    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const renderItem = (item: NotificationFragmentFragment) => <NotificationCard notification={item} />;

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? <Loading /> : null}
        <Text style={{ ...Typography.bodyText }}>There are no more notifications.</Text>
      </View>
    );
  };

  if (error) return <Error message={error.message} apolloError={error} />;
  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.title}
      renderItem={({ item }) => (
        <FlatList
          data={item.innerArray}
          bounces={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderItem(item)}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={{ ...Typography.subHeaderText, marginTop: Spacing.base }}>{item.title}</Text>
            </View>
          }
          ItemSeparatorComponent={() => <Divider style={styles.divider} />}
        />
      )}
      ListFooterComponent={renderFooter}
    />
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
    paddingHorizontal: Spacing.base,
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
  divider: {
    borderBottomColor: Colors.gray700,
    marginVertical: 0,
  },
});
export default NotificationsScreen;
