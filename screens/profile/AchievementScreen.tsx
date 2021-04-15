import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import useAuthentication from '../../hooks/useAuthentication';
import { Spacing, Typography } from '../../theme';
import Achievement from '../../components/general/Achievement';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { RouteProp } from '@react-navigation/native';
import { FeedStackParamList, ProfileStackParamList } from '../../types/navigationTypes';
import { AchievementFragmentFragment } from '../../graphql/Fragments.generated';
import { useAchievementsQuery } from '../../graphql/queries/Achievements.generated';
import { AchievementRule, UserProfile } from '../../types/profileTypes';
import { GeoFenceCategory } from '../../types/geoFenceTypes';

type UserProfileRouteProp = RouteProp<FeedStackParamList, 'Achievements'>;
type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Achievements'>;

type Props = {
  route: ProfileRouteProp | UserProfileRouteProp;
};

const getProgress = (userProfile: UserProfile, achievement: AchievementFragmentFragment): number => {
  const rule: AchievementRule = achievement.rule;

  if (rule.score && rule.score > 0) {
    if (rule.streak_count) return userProfile.streak / rule.streak_count;
    if (!rule.category) return userProfile.totalScore / rule.score;
    else if (rule.category === GeoFenceCategory.CULTURE) return userProfile.cultureScore / rule.score;
    else if (rule.category === GeoFenceCategory.EDUCATION) return userProfile.educationScore / rule.score;
    else if (rule.category === GeoFenceCategory.EXERCISE) return userProfile.exerciseScore / rule.score;
    else if (rule.category === GeoFenceCategory.SOCIAL) return userProfile.socialScore / rule.score;
  }
  return 0;
};

const AchievementScreen: React.FC<Props> = ({ route }: Props) => {
  const id = route && route.params && route.params.user_id ? route.params.user_id : useAuthentication().user?.uid;
  const userProfile = route.params.userProfile;
  if (id) {
    const [achieved, setAchieved] = useState<readonly AchievementFragmentFragment[]>([]);
    const [unachieved, setUnachieved] = useState<readonly AchievementFragmentFragment[]>([]);

    const { loading, error, data } = useAchievementsQuery({
      variables: {
        user_id: id,
      },
      nextFetchPolicy: 'network-only',
    });

    useEffect(() => {
      if (data && data.unachievedachievements && data.user?.user_achievement) {
        setAchieved(data.user.user_achievement.map((item) => item.achievement));
        setUnachieved(data.unachievedachievements);
      }
    }, [data]);

    const renderAchievements = (list: readonly AchievementFragmentFragment[], achieved: boolean) => {
      return list.map((achievement, index) => (
        <View key={index} style={styles.achievement}>
          <Achievement
            achievement={achievement}
            key={index}
            achieved={achieved}
            progress={achieved ? 0 : getProgress(userProfile, achievement)}
          />
        </View>
      ));
    };

    if (error) return <Error message={error.message} apolloError={error} />;
    if (loading) return <Loading />;
    return (
      <ScrollView contentContainerStyle={styles.achievementsContainer}>
        <Text style={styles.header}>Achieved</Text>
        {achieved.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>No achivements...</Text>
          </View>
        ) : (
          renderAchievements(achieved, true)
        )}

        <Text style={styles.header}>Unachieved</Text>
        {unachieved.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>
              Congratulations you have received all possible achievments!
            </Text>
          </View>
        ) : (
          renderAchievements(unachieved, false)
        )}
      </ScrollView>
    );
  }
  return <Text style={{ ...Typography.largeBodyText }}>Error: Missing user id</Text>;
};

const styles = StyleSheet.create({
  header: {
    ...Typography.headerText,
    width: '100%',
    marginVertical: Spacing.smaller,
    marginHorizontal: Spacing.base,
  },
  achievementsContainer: {
    marginVertical: Spacing.smaller,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  achievement: {
    paddingHorizontal: Spacing.smallest,
    marginBottom: Spacing.smaller,
    width: '33%',
  },
  noData: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.small,
  },
});

export default AchievementScreen;
