import React, { useCallback, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, RefreshControl, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { UserProfile } from '../../types/profileTypes';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { getCategoryIconName, getCategoryColor } from '../../components/feed/ActivityFeedCard';
import ProfileActivityCard from '../../components/ProfileActivityCard';
import Achievement from '../../components/Achievement';
import { convertToUserProfile, defaultUserProfile } from '../../helpers/objectMappers';
import Loading from '../../components/Loading';

const ProfileScreen: React.FC = () => {
  const id = useAuthentication().user?.uid;
  const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
  if (id) {
    const [refreshing, setRefreshing] = useState(false);
    const [limit, setLimit] = useState(3);
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }, []);
    const { loading: loading, error: error, data: data, refetch, fetchMore } = useProfileUserQuery({
      variables: {
        id: id,
        limit: limit,
      },
      nextFetchPolicy: 'network-only',
    });

    useEffect(() => {
      if (data && data.user) {
        const userData = convertToUserProfile(data);
        if (userData) setUserProfile(userData);
      }
    }, [data]);

    const getScore = (category: GeoFenceCategory) => {
      switch (category) {
        case GeoFenceCategory.CULTURE:
          return userProfile.cultureScore;
        case GeoFenceCategory.SOCIAL:
          return userProfile.socialScore;
        case GeoFenceCategory.EXERCISE:
          return userProfile.exerciseScore;
        case GeoFenceCategory.EDUCATION:
          return userProfile.educationScore;
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
    const renderAchievements = () => {
      return userProfile.achievements
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
    const renderActivities = () => {
      return userProfile.activities.map((activity, index) => <ProfileActivityCard key={index} activity={activity} />);
    };
    const loadMoreActivities = () => {
      const newLimit = limit + 3;
      setLimit(newLimit);
      fetchMore({
        variables: {
          limit: newLimit,
        },
      });
    };

    if (error) {
      console.error(error);
      Alert.alert('Error', error?.message);
    }
    if (loading) return <Loading />;

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
          <Image source={{ uri: userProfile.picture }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{userProfile.name}</Text>
            <Text style={styles.bio}>{userProfile.bio}</Text>
          </View>
        </View>

        <Text style={styles.header}>Achievements</Text>
        <ScrollView style={styles.achievementsContainer} horizontal={true}>
          {renderAchievements()}
        </ScrollView>

        <Text style={styles.header}>Score</Text>
        <View style={styles.scoreContainer}>
          <View style={styles.categoryScore}>{renderScore()}</View>
          <View style={styles.totalScoreContainer}>
            <Text style={styles.totalScore}>Total: {userProfile.totalScore}</Text>
          </View>
        </View>

        <Text style={styles.header}>Activities</Text>
        <View style={styles.activitiesContainer}>
          {renderActivities()}
          <Button title={'Load more...'} onPress={loadMoreActivities}></Button>
        </View>
      </ScrollView>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
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
    marginHorizontal: -Spacing.smallest,
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
    marginBottom: Spacing.smaller,
  },
  activitiesContainer: {
    marginBottom: Spacing.base,
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
  loadMoreButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
  },
});

export default ProfileScreen;
