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
import { useNavigation } from '@react-navigation/native';

type SectionItem = { title: string; innerArray?: NotificationFragmentFragment[] };
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
          seen: true,
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
          seen: true,
          user_id: 't1Kg1gYha8hwez4Wzqs1Kvr9FXf2',
          created_at: '2021-02-25T12:17:40.496442+00:00',
        },
      ] as NotificationFragmentFragment[],
    },
  };

  const [sections, setSections] = useState<SectionItem[]>();
  const { data, loading, error } = useNotifiactionsQuery({
    fetchPolicy: 'network-only',
  });
  const user_id = useAuthentication().user?.uid ?? '';
  const [readNotifications] = useUpdateNotificationsMutation();
  const navigation = useNavigation();
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
    const unsubscribe = navigation.addListener('beforeRemove', () => readNotifications({ variables: { user_id } }));
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
