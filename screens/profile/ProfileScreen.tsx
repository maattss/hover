import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, RefreshControl, Button, ScrollView, ActivityIndicator } from 'react-native';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { UserProfile } from '../../types/profileTypes';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import Achievement from '../../components/profile/Achievement';
import { convertToUserProfile, defaultUserProfile } from '../../helpers/objectMappers';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import { RouteProp } from '@react-navigation/native';
import { FeedStackParamList, ProfileStackParamList } from '../../types/navigationTypes';
import { ActivityFeedData, FeedCategory } from '../../types/feedTypes';
import ActivityFeedCard from '../../components/feed/ActivityFeedCard';
import { useProfileActivitiesQuery } from '../../graphql/queries/ProfileActivities.generated';
import { FeedActivityFragmentFragment } from '../../graphql/Fragments.generated';

type FeedRouteProp = RouteProp<FeedStackParamList, 'UserProfile'>;
type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

type Props = {
  route: ProfileRouteProp | FeedRouteProp;
};
const ProfileScreen: React.FC<Props> = ({ route }: Props) => {
  const id = route && route.params && route.params.user_id ? route.params.user_id : useAuthentication().user?.uid;
  if (id) {
    const pageSize = 3;
    const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
    const [activities, setActivities] = useState<readonly FeedActivityFragmentFragment[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [offset, setOffset] = useState(0);
    const [fetchingMore, setFetchingMore] = useState(false);
    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      await userRefetch();
      await activitiesRefetch();
      setRefreshing(false);
    }, []);

    const { loading: userLoading, error: userError, data: userData, refetch: userRefetch } = useProfileUserQuery({
      variables: {
        id: id,
      },
      nextFetchPolicy: 'network-only',
    });
    const {
      loading: activitiesLoading,
      error: activitiesError,
      data: activitiesData,
      refetch: activitiesRefetch,
      fetchMore,
    } = useProfileActivitiesQuery({
      variables: {
        id: id,
        limit: pageSize,
        offset: offset,
      },
      nextFetchPolicy: 'network-only',
    });

    useEffect(() => {
      if (userData && userData.user) {
        const data = convertToUserProfile(userData);
        if (data) setUserProfile(data);
      }
    }, [userData]);
    useEffect(() => {
      if (activitiesData && activitiesData.activities) {
        if (activitiesData.activities.length === 0) {
          setEndReached(true);
        } else {
          if (fetchingMore) {
            setActivities(activities.concat(activitiesData.activities));
            setFetchingMore(false);
          } else {
            setActivities(activitiesData.activities);
          }
        }
        const data = convertToUserProfile(userData);
        if (data) setUserProfile(data);
      }
    }, [activitiesData]);

    const loadMoreActivities = async () => {
      if (!endReached && !activitiesLoading) {
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
      if (activitiesLoading && !endReached) return <ActivityIndicator color={Colors.blue} />;
      if (endReached && !activitiesLoading) return <Text style={styles.theEnd}>The end...</Text>;
      return <></>;
    };

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
      return Object.keys(GeoFenceCategory).map((category, index) => {
        const categoryEnum: GeoFenceCategory = GeoFenceCategory[category as keyof typeof GeoFenceCategory];
        return (
          <View key={index} style={styles.score}>
            <Image source={{ uri: getGeoFenceImage(categoryEnum) }} style={styles.categoryIcon} />
            <Text style={{ ...Typography.headerText, textAlign: 'center' }}>{getScore(categoryEnum)}</Text>
          </View>
        );
      });
    };
    const renderAchievements = () => {
      return userProfile.achievements
        .slice(0)
        .reverse()
        .map((achievement, index) => (
          <View key={index} style={styles.achievement}>
            <Achievement achievement={achievement} key={index} />
          </View>
        ));
    };
    const renderActivities = () => {
      return activities.map((activity, index) => {
        const data: ActivityFeedData = {
          activity: activity,
          user: {
            __typename: 'users',
            id: userProfile.id,
            name: userProfile.name,
            picture: userProfile.picture,
          },
          createdAt: activity.created_at,
          feedCategory: FeedCategory.ACTIVITY,
        };
        return (
          <View key={index} style={{ marginBottom: Spacing.smaller }}>
            <ActivityFeedCard data={data} />
          </View>
        );
      });
    };

    if (userError) return <Error message={userError.message} apolloError={userError} />;
    if (userLoading) return <Loading />;

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
        {userProfile.achievements.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>No achivements...</Text>
          </View>
        ) : (
          <ScrollView style={styles.achievementsContainer} horizontal={true}>
            {renderAchievements()}
          </ScrollView>
        )}
        <Text style={styles.header}>Score</Text>
        <View style={styles.scoreContainer}>
          <View style={styles.categoryScore}>{renderScore()}</View>
          <View style={styles.totalScoreContainer}>
            <Text style={styles.totalScore}>Total: {userProfile.totalScore}</Text>
          </View>
        </View>
        <Text style={styles.header}>Activities</Text>
        {activities.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>No activites...</Text>
          </View>
        ) : (
          <View style={styles.activitiesContainer}>
            {renderActivities()}
            <Button title={'Load more...'} onPress={loadMoreActivities}></Button>
          </View>
        )}
        {renderFooter()}
      </ScrollView>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.smaller,
  },
  name: {
    ...Typography.headerText,
    flexWrap: 'wrap',
  },
  bio: {
    ...Typography.largeBodyText,
    fontStyle: 'italic',
    marginTop: Spacing.smallest,
    flexWrap: 'wrap',
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
    flexShrink: 1,
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
    alignItems: 'center',
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
    height: 70,
    width: 70,
    margin: Spacing.small,
  },
  loadMoreButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
  },
  noData: {
    marginLeft: Spacing.smaller,
    marginBottom: Spacing.small,
  },
  theEnd: {
    ...Typography.bodyText,
    textAlign: 'center',
    paddingBottom: Spacing.base,
    paddingTop: Spacing.smaller,
  },
});

export default ProfileScreen;
