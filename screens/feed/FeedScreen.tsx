import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, ListRenderItem } from 'react-native';
import ActivityFeedCard from '../../components/feed/ActivityFeedCard';
import AchievementFeedCard from '../../components/feed/AchievementFeedCard';
import { Typography, Spacing, Colors } from '../../theme';
import { FeedData, FeedCategory, ActivityFeedData, AchievementFeedData } from '../../types/feedTypes';
import { useFeedQuery } from '../../graphql/queries/Feed.generated';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import { convertToFeedData } from '../../helpers/objectMappers';

const getItem = (data: FeedData) => {
  if (data.feedCategory === FeedCategory.ACTIVITY) {
    return (
      <View style={styles.element}>
        <ActivityFeedCard data={data as ActivityFeedData} />
      </View>
    );
  } else if (data.feedCategory === FeedCategory.ACHIEVEMENT) {
    return (
      <View style={styles.element}>
        <AchievementFeedCard data={data as AchievementFeedData} />
      </View>
    );
  }
  return <></>;
};

const FeedScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(10);
  const [feedElements, setFeedElements] = useState<FeedData[]>([]);

  const { loading: loading, error: error, data: data, refetch, fetchMore } = useFeedQuery({
    variables: {
      limit: limit,
    },
    nextFetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (data && data.feed) {
      const feedData = convertToFeedData(data);
      setFeedElements(feedData);
    }
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const loadMoreFeedElements = async () => {
    const newLimit = limit + 10;
    setLimit(newLimit);
    fetchMore({
      variables: {
        limit: newLimit,
      },
    });
  };

  if (error) <Error message={error.message} apolloError={error} />;
  if (loading) <Loading />;

  const renderItem: ListRenderItem<FeedData> = ({ item }) => getItem(item);
  return (
    <FlatList<FeedData>
      style={styles.container}
      data={feedElements}
      renderItem={(item) => renderItem(item)}
      keyExtractor={(_, index) => index.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.blue}
          colors={[Colors.blue]}
          progressBackgroundColor={Colors.transparent}
        />
      }
      onEndReached={loadMoreFeedElements}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.smaller,
    marginBottom: Spacing.smaller,
  },
  header: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
  },
  element: {
    marginBottom: Spacing.smaller,
    width: '100%',
  },
});

export default FeedScreen;
