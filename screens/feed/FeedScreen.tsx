import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, RefreshControl, Button } from 'react-native';
import ActivityFeedCard from '../../components/feed/ActivityFeedCard';
import AchievementFeedCard from '../../components/feed/AchievementFeedCard';
import { Typography, Spacing, Colors } from '../../theme';
import { ActivityFeedData, AchievementFeedData, ChallengeFeedData } from '../../types/feedTypes';
import { CircleGeoFence, GeoFenceCategory, GeoFenceVariant } from '../../types/geoFenceTypes';
import { AchievementVariant } from '../../types/profileTypes';
import { useFeedQuery } from '../../graphql/queries/Feed.generated';
import { ScrollView } from 'react-native-gesture-handler';

// Test data. TODO: Remove
const testGeoFence: CircleGeoFence = {
  id: 9,
  latitude: 63.431731,
  longitude: 10.406626,
  radius: 50,
  name: 'Test name',
  category: GeoFenceCategory.EDUCATION,
  variant: GeoFenceVariant.CIRCLE,
  description: 'Test description',
};
const testActivity: ActivityFeedData = {
  userName: 'Siri Mykland',
  caption: 'Very nice activity!',
  geoFence: testGeoFence,
  startedAt: '2021-01-29T10:00:00+01:00',
  picture: 'https://api.multiavatar.com/Kuninori%20Bun%20Lord.png',
  score: 200,
  duration: 100,
};
const testAchievement: AchievementFeedData = {
  userName: 'Mats Tyldum',
  picture: 'https://api.multiavatar.com/c68e82f2fb46979b85.png',
  achievement: {
    name: '1000 points',
    description: 'Achieved 1000 points!',
    type: AchievementVariant.SCORE,
    createdAt: '2021-01-28T09:00:00+01:00',
    level: 1,
    rule: { score: 100, category: 'CULTURE' },
  },
};
const testChallenge: ChallengeFeedData = {
  name: 'MaxPoints7Days',
  userName1: 'Mats Tyldum',
  userName2: 'Siri Mykland',
  userPicture1: 'https://api.multiavatar.com/c68e82f2fb46979b85.png',
  userPicture2: 'https://api.multiavatar.com/Kuninori%20Bun%20Lord.png',
  createdAt: '2021-01-29T13:00:00+01:00',
  description: 'Highest amount of points in the next 7 days.',
};

const FeedScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(3);
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
    const newLimit = limit + 3;
    setLimit(newLimit);
    fetchMore({
      variables: {
        limit: newLimit,
      },
    });
  };
  useEffect(() => {
    if (data && data.feed) {
      console.log('Feed data', data.feed);
    }
  }, [data]);

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
      <View>
        {/* TODO: Replace examples with refreshable list with data from API */}
        <View style={styles.element}>
          <ActivityFeedCard activity={testActivity} />
        </View>
        <View style={styles.element}>
          <AchievementFeedCard data={testAchievement} />
        </View>
        <Button title={'Load more...'} onPress={loadMoreFeedElements}></Button>
      </View>
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
