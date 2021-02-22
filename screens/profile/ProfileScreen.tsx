import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, RefreshControl, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { UserProfile } from '../../types/profileTypes';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import ProfileActivityCard from '../../components/profile/ProfileActivityCard';
import Achievement from '../../components/profile/Achievement';
import { convertToUserProfile, defaultUserProfile } from '../../helpers/objectMappers';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import { RouteProp } from '@react-navigation/native';
import { FeedStackParamList, ProfileStackParamList } from '../../types/navigationTypes';

type FeedRouteProp = RouteProp<FeedStackParamList, 'UserProfile'>;
type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

type Props = {
  route: ProfileRouteProp | FeedRouteProp;
};
const ProfileScreen: React.FC<Props> = ({ route }: Props) => {
  const id = route && route.params && route.params.user_id ? route.params.user_id : useAuthentication().user?.uid;
  if (id) {
    const [userProfile, setUserProfile] = useState<UserProfile>(defaultUserProfile);
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

    if (error) return <Error message={error.message} apolloError={error} />;
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
        {userProfile.activities.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>No activites...</Text>
          </View>
        ) : (
          <View style={styles.activitiesContainer}>
            {renderActivities()}
            <Button title={'Load more...'} onPress={loadMoreActivities}></Button>
          </View>
        )}
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
});

export default ProfileScreen;
