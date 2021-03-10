import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';
import { NotificationFragmentFragment } from '../../graphql/Fragments.generated';
import NotificationCard from '../../components/feed/notification/NotificationCard';
import Divider from '../../components/general/Divider';
import { StackNavigationProp } from '@react-navigation/stack';
import { FeedStackParamList } from '../../types/navigationTypes';
import useNotification from '../../hooks/useNotification';
import { useIsFocused } from '@react-navigation/native';

type SectionItem = { title: string; innerArray?: NotificationFragmentFragment[] };

type NavigationProp = StackNavigationProp<FeedStackParamList>;
export type NotificationProps = {
  navigation: NavigationProp;
};

const NotificationsScreen: React.FC<NotificationProps> = ({ navigation }: NotificationProps) => {
  const [sections, setSections] = useState<SectionItem[]>();
  const { newNotifications, earlierNotifications, readNotifications, refetchNotifications } = useNotification();
  const [refreshing, setRefreshing] = useState(false);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus && !sections?.length) refetchNotifications();
  });
  useEffect(() => {
    const tempSections: SectionItem[] = [];
    if (newNotifications && newNotifications.length > 0)
      tempSections.push({ title: 'New', innerArray: newNotifications });
    if (earlierNotifications && earlierNotifications.length > 0)
      tempSections.push({ title: 'Earlier', innerArray: earlierNotifications });
    setSections(tempSections);
  }, [newNotifications, earlierNotifications]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', async () => readNotifications());

    return () => {
      unsubscribe;
    };
  }, [navigation]);

  const renderItem = (item: NotificationFragmentFragment) => <NotificationCard notification={item} />;

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <Text style={{ ...Typography.largeBodyText }}>
          {sections?.length == 0 ? 'You have no notifications' : 'No more notifications'}
        </Text>
      </View>
    );
  };

  return (
    <FlatList
      data={sections}
      keyExtractor={(item) => item.title}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetchNotifications();
            setRefreshing(false);
          }}
          tintColor={Colors.blue}
          colors={[Colors.blue]}
          progressBackgroundColor={Colors.transparent}
        />
      }
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
        />
      )}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.small,
    flex: 1,
    paddingBottom: Spacing.smaller,
  },
  footer: {
    padding: Spacing.base,
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
