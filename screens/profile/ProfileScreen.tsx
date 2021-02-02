/* eslint-disable @typescript-eslint/no-var-requires */
import { Asset } from 'expo-asset';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Image, RefreshControl } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { Colors, Spacing, Typography } from '../../theme';
import { UserProfile, Achievement as AchievementType, AchievementVariant } from '../../types/profileTypes';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { getCategoryIconName, getCategoryColor } from '../../components/feed/ActivityFeedCard';
import Achievement from '../../components/Achievement';

const ProfileScreen: React.FC = () => {
  const id = useAuthentication().user?.uid;
  const [user, setUser] = useState<UserProfile>({
    name: '',
    bio: '',
    email: '',
    picture: Asset.fromModule(require('../../assets/images/user.png')).uri, // Default picture
    totalScore: 0,
    educationScore: 0,
    cultureScore: 0,
    socialScore: 0,
    exerciseScore: 0,
    achievements: [],
  });
  console.log('rerender');
  if (id) {
    const { loading: loading, error: error, data: data, refetch } = useProfileUserQuery({
      variables: {
        id: id,
      },
      fetchPolicy: 'network-only',
    });
    useEffect(() => {
      if (data) {
        if (data.user) {
          const achievements: AchievementType[] = [];
          data.user.user_achievement.forEach((obj) => {
            achievements.push({
              description: obj.achievement.description ?? '',
              name: obj.achievement.name ?? '',
              level: obj.achievement.level ?? 3,
              createdAt: obj.achievement.created_at ?? '',
              type: AchievementVariant[obj.achievement.achievement_type as keyof typeof AchievementVariant],
              rule: obj.achievement.rule ?? '{}',
            });
          });
          setUser({
            name: data.user.name ?? user.name,
            bio: data.user.bio ?? user.bio,
            email: data.user.email ?? user.email,
            picture: data.user.picture ?? user.picture,
            totalScore: data.user.totalScore ?? user.totalScore,
            educationScore: data.user.education_score.aggregate?.sum?.score ?? user.educationScore,
            cultureScore: data.user.culture_score.aggregate?.sum?.score ?? user.cultureScore,
            socialScore: data.user.social_score.aggregate?.sum?.score ?? user.socialScore,
            exerciseScore: data.user.exercise_score.aggregate?.sum?.score ?? user.exerciseScore,
            achievements: achievements,
          });
        }
      }
    }, [data]);

    const renderAchievements = () => {
      return user.achievements
        .slice(0)
        .reverse()
        .map((achievement, index) => {
          return (
            <View key={index} style={styles.achievement}>
              <Achievement achievement={achievement} key={index} />
            </View>
          );
        });
    };
    const getScore = (category: GeoFenceCategory) => {
      switch (category) {
        case GeoFenceCategory.CULTURE:
          return user.cultureScore;
        case GeoFenceCategory.SOCIAL:
          return user.socialScore;
        case GeoFenceCategory.EXERCISE:
          return user.exerciseScore;
        case GeoFenceCategory.EDUCATION:
          return user.educationScore;
        default:
          return 0;
      }
    };
    const renderScore = () => {
      const categoryColor = (category: GeoFenceCategory) => {
        return {
          color: getCategoryColor(category),
        };
      };

      return Object.keys(GeoFenceCategory)
        .filter((key) => !isNaN(Number(GeoFenceCategory[key as keyof typeof GeoFenceCategory])))
        .map((category, index) => {
          const categoryEnum: GeoFenceCategory = GeoFenceCategory[category as keyof typeof GeoFenceCategory];
          return (
            <View key={index} style={styles.score}>
              <FAIcon
                style={[styles.categoryIcon, categoryColor(categoryEnum)]}
                name={getCategoryIconName(categoryEnum)}
              />
              <Text style={{ ...Typography.headerText, textAlign: 'center' }}>{getScore(categoryEnum)}</Text>
            </View>
          );
        });
    };

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }, []);

    if (error) {
      console.error(error);
      Alert.alert('Error', error?.message);
    }
    if (loading && !refreshing)
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.blue} />
        </View>
      );
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
        <View style={styles.topContainer}>
          <Image source={{ uri: user.picture }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>
        </View>

        <Text style={styles.header}>Achievements</Text>
        <ScrollView style={styles.achievementsContainer} horizontal={true}>
          {renderAchievements()}
        </ScrollView>

        <Text style={styles.header}>Score</Text>
        <View style={styles.categoryScore}>{renderScore()}</View>
        <View style={styles.totalScoreContainer}>
          <Text style={styles.totalScore}>Total: {user.totalScore}</Text>
        </View>

        <Text style={styles.header}>Activities</Text>
        <ScrollView style={styles.activitiesContainer} horizontal={true}>
          <Text style={{ ...Typography.largeBodyText }}>Insert activities here</Text>
        </ScrollView>
      </ScrollView>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.smaller,
  },
  name: {
    ...Typography.headerText,
  },
  bio: {
    ...Typography.largeBodyText,
    fontStyle: 'italic',
    marginTop: Spacing.smallest,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '20%',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    margin: Spacing.small,
    backgroundColor: Colors.white, // Default color
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
  },
  header: {
    ...Typography.headerText,
    marginTop: Spacing.base,
    marginBottom: Spacing.smaller,
    marginLeft: Spacing.smaller,
  },
  infoContainer: {
    padding: Spacing.base,
    justifyContent: 'center',
  },
  scoreContainer: {
    marginVertical: Spacing.small,
  },
  score: {
    ...Typography.headerText,
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    margin: Spacing.smallest,
    width: '47.5%',
  },
  totalScoreContainer: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    margin: Spacing.smallest,
    padding: Spacing.base,
  },
  totalScore: {
    ...Typography.headerText,
    textAlign: 'center',
  },
  categoryScore: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  achievementsContainer: {
    height: 120,
  },
  achievement: {
    marginHorizontal: Spacing.smallest,
  },
  activitiesContainer: {
    height: 240,
    paddingHorizontal: Spacing.smaller,
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
});

export default ProfileScreen;
