import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import useAuthentication from '../../hooks/useAuthentication';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Achievement from '../../components/general/Achievement';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { RouteProp } from '@react-navigation/native';
import { FeedStackParamList, ProfileStackParamList } from '../../types/navigationTypes';
import { AchievementFragmentFragment } from '../../graphql/Fragments.generated';
import { useAchievementsQuery } from '../../graphql/queries/Achievements.generated';

type FeedRouteProp = RouteProp<FeedStackParamList, 'UserProfile'>;
type ProfileRouteProp = RouteProp<ProfileStackParamList, 'Profile'>;

type Props = {
  route: ProfileRouteProp | FeedRouteProp;
};

const AchievementScreen: React.FC<Props> = ({ route }: Props) => {
  const id = route && route.params && route.params.user_id ? route.params.user_id : useAuthentication().user?.uid;
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
      if (data && data.unachievedachievements && data.user_achievement) {
        setAchieved(data.user_achievement.map((item) => item.achievement));
        setUnachieved(data.unachievedachievements);
      }
    }, [data]);

    const renderAchievements = () => {
      return achieved
        .map((achievement, index) => (
          <View key={index} style={styles.achievement}>
            <Achievement achievement={achievement} key={index} />
          </View>
        ))
        .concat(
          unachieved.map((achievement, index) => (
            <View key={index} style={styles.achievement}>
              <Achievement achievement={achievement} key={index} />
            </View>
          )),
        );
    };

    if (error) return <Error message={error.message} apolloError={error} />;
    if (loading) return <Loading />;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.header}>Achievements</Text>
        {achieved.length + unachieved.length < 1 ? (
          <View style={styles.noData}>
            <Text style={{ ...Typography.largeBodyText }}>No achivements...</Text>
          </View>
        ) : (
          <ScrollView style={styles.achievementsContainer}>{renderAchievements()}</ScrollView>
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
    padding: Spacing.smaller,
  },
  loadMoreText: {
    ...Typography.largeBodyText,
    color: Colors.blue,
    textAlign: 'center',
    padding: Spacing.smaller,
  },
});

export default AchievementScreen;
