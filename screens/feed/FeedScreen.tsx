import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, Button, Text } from 'react-native';
import ActivityFeedCard from '../../components/feed/ActivityFeedCard';
import AchievementFeedCard from '../../components/feed/AchievementFeedCard';
import { Typography, Spacing, Colors } from '../../theme';
import { FeedData, FeedCategory, ActivityFeedData } from '../../types/feedTypes';

import { useFeedQuery } from '../../graphql/queries/Feed.generated';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import { convertToFeedData } from '../../helpers/objectMappers';

const renderFeed = (feedElements: FeedData[]) => {
  return feedElements.map((data, index) => {
    if (data.feedCategory === FeedCategory.ACTIVITY) {
      return (
        <View key={index} style={styles.element}>
          <ActivityFeedCard data={data as ActivityFeedData} />
        </View>
      );
    } else if (data.feedCategory === FeedCategory.ACHIEVEMENT) {
      return (
        <View key={index} style={styles.element}>
          <Text>Achievement</Text>
          {/* <AchievementFeedCard achievement={element as AchievementFeedData} /> */}
        </View>
      );
    }
    return <></>;
  });
};

const FeedScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(10);
  const [feedElements, setFeedElements] = useState<FeedData[]>([]);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);
  const { loading: loading, error: error, data: data, refetch, fetchMore } = useFeedQuery({
    variables: {
      limit: limit,
    },
    nextFetchPolicy: 'network-only',
  });
  const loadMoreFeedElements = () => {
    const newLimit = limit + 10;
    setLimit(newLimit);
    fetchMore({
      variables: {
        limit: newLimit,
      },
    });
  };
  useEffect(() => {
    if (data && data.feed) {
      const feedData = convertToFeedData(data);
      console.log(feedData);
      setFeedElements(feedData);
    }
  }, [data]);

  if (error) <Error message={error.message} apolloError={error} />;
  if (loading) <Loading />;

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Colors.blue}
          colors={[Colors.blue]}
          progressBackgroundColor={Colors.transparent}
        />
      }>
      {renderFeed(feedElements)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.smaller,
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
