import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import ActivityFeedCard from '../../components/ActivityFeedCard';
import AchievementFeedCard from '../../components/AchievementFeedCard';
import { Typography, Spacing } from '../../theme';
import { ActivityFeedData, AchievementFeedData } from '../../types/feedTypes';
import { CircleGeoFence, GeoFenceCategory, GeoFenceVariant } from '../../types/geoFenceTypes';

const FeedScreen: React.FC = () => {
  const testGeoFence: CircleGeoFence = {
    id: 9,
    latitude: 63.431731,
    longitude: 10.406626,
    radius: 50,
    name: 'Test name',
    category: GeoFenceCategory.SOCIAL,
    variant: GeoFenceVariant.CIRCLE,
    description: 'Test description',
  };
  const testActivity: ActivityFeedData = {
    name: 'Ola Nordmann',
    caption: 'Very nice workout!',
    geoFence: testGeoFence,
    startedAt: '2021-01-24T18:00:00+00:00',
    picture: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    score: 200,
  };
  const testAchievement: AchievementFeedData = {
    name: 'Ola Nordmann',
    picture: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
  };

  return (
    <View style={styles.container}>
      {/* TODO: Replace examples with refreshable list with data from API */}
      <ActivityFeedCard activity={testActivity} />
      <AchievementFeedCard achievement={testAchievement} />
      <ActivityFeedCard activity={testActivity} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
  },
  header: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
  },
});

export default FeedScreen;
