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
    if (!rule.category) return userProfile.totalScore / rule.score;
    else if (rule.category === GeoFenceCategory.CULTURE) return userProfile.cultureScore / rule.score;
    else if (rule.category === GeoFenceCategory.EDUCATION) return userProfile.educationScore / rule.score;
    else if (rule.category === GeoFenceCategory.EXERCISE) return userProfile.exerciseScore / rule.score;
    else if (rule.category === GeoFenceCategory.SOCIAL) return userProfile.socialScore / rule.score;
  } else return 0;
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
      <ScrollView>
        {achieved.length + unachieved.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>No achivements...</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.achievementsContainer}>
            <Text style={styles.header}>Achieved</Text>
            {renderAchievements(achieved, true)}
            <Text style={styles.header}>Unachieved</Text>
            {renderAchievements(unachieved, false)}
          </ScrollView>
        )}
      </ScrollView>
    );
  }
  return <Text style={{ ...Typography.largeBodyText }}>Error: Missing user id</Text>;
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.smaller,
  },
  header: {
    ...Typography.headerText,
    marginTop: Spacing.base,
    marginBottom: Spacing.smaller,
    marginLeft: Spacing.smaller,
    width: '100%',
  },
  achievementsContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  achievement: {
    marginHorizontal: Spacing.smallest,
    marginBottom: Spacing.smaller,
    width: '30%',
  },
  noData: {
    marginLeft: Spacing.smaller,
    marginBottom: Spacing.small,
  },
});

export default AchievementScreen;
