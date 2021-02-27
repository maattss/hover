import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, ListRenderItem, ActivityIndicator, Text } from 'react-native';
import ActivityFeedCard from '../../components/feed/ActivityFeedCard';
import AchievementFeedCard from '../../components/feed/AchievementFeedCard';
import { Typography, Spacing, Colors } from '../../theme';
import {
  FeedData,
  FeedCategory,
  ActivityFeedData,
  AchievementFeedData,
  ChallengeFeedData,
} from '../../types/feedTypes';
import { useFeedQuery } from '../../graphql/queries/Feed.generated';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../components/general/Loading';
import Error from '../../components/general/Error';
import { convertToFeedData } from '../../helpers/objectMappers';
import ChallengeFeedCard from '../../components/feed/ChallengeFeedCard';

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
  } else if (data.feedCategory === FeedCategory.CHALLENGE) {
    return (
      <View style={styles.element}>
        <ChallengeFeedCard data={data as ChallengeFeedData} />
      </View>
    );
  }
  return <></>;
};

const FeedScreen: React.FC = () => {
  const pageSize = 10;
  const [refreshing, setRefreshing] = useState(false);
  const [offset, setOffset] = useState(0);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [feedElements, setFeedElements] = useState<FeedData[]>([]);

  const { loading: loading, error: error, data: data, refetch, fetchMore } = useFeedQuery({
    variables: {
      limit: pageSize,
      offset: offset,
    },
    nextFetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (data && data.feed) {
      if (data.feed.length == 0) {
        setEndReached(true);
      } else {
        const newFeedData = convertToFeedData(data);
        if (fetchingMore) {
          setFeedElements(feedElements.concat(newFeedData));
          setFetchingMore(false);
        } else {
          setFeedElements(newFeedData);
        }
      }
    }
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const loadMoreFeedElements = async () => {
    if (!endReached && !loading) {
      const newOffset = offset + pageSize;
      setOffset(newOffset);
      setFetchingMore(true);
      await fetchMore({
        variables: {
          limit: pageSize,
          offset: newOffset,
        },
      });
    }
  };
  const renderFooter = () => {
    if (loading && !endReached) return <ActivityIndicator color={Colors.blue} />;
    if (endReached && !loading) return <Text style={styles.theEnd}>The end...</Text>;
    return <></>;
  };

  if (error) return <Error message={error.message} apolloError={error} />;
  if (loading && !fetchingMore) return <Loading />;

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
      onEndReachedThreshold={0.5}
      onEndReached={loadMoreFeedElements}
      ListFooterComponent={renderFooter}
    />
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
  footer: {
    padding: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  theEnd: {
    ...Typography.bodyText,
    textAlign: 'center',
    paddingBottom: Spacing.base,
    paddingTop: Spacing.smaller,
  },
});

export default FeedScreen;
