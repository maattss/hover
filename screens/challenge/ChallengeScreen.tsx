import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useGetChallengesQuery } from '../../graphql/queries/GetChallenges.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import useAuthentication from '../../hooks/useAuthentication';
import { OngoingChallenge, PendingChallenge } from '../../types/challengeTypes';
import { convertChallenge } from '../../helpers/objectMappers';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import PendingChallengeCard from '../../components/challenge/PendingChallengeCard';
import OngoingChallengesList from '../../components/challenge/OngoingChallengesList';

type NavigationProp = StackNavigationProp<ChallengeStackParamList>;

export type ChallengesProps = {
  navigation: NavigationProp;
};

const ChallengeScreen: React.FC<ChallengesProps> = (props: ChallengesProps) => {
  const user_id = useAuthentication().user?.uid;
  // const [refreshing, setRefreshing] = useState(false);
  // const [challengeType, setChallengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  //const [endDate, setEndDate] = useState<Date>(new Date('2021-02-11'));
  /* const [participants, setParticipants] = useState<Challenge_Participant_Insert_Input[]>([
    { user_id: 'vFRT8aC4F0bCqSJoQcHZ1xXUdEo1', accepted: true },
    { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' },
  ]); */

  /*const [createChallenge, { data }] = useInsertChallengeMutation({
    variables: { challenge_type: challengeType, end_date: endDate, participants: participants },
  }); */

  const [pendingChallenges, setPendingChallenges] = useState<PendingChallenge[]>();
  const [ongoingChallenges, setOngoingChallenges] = useState<OngoingChallenge[]>();

  const { data: challengeData, loading, error, refetch } = useGetChallengesQuery({
    variables: { user_id: user_id ? user_id : '' },
  });

  useEffect(() => {
    if (challengeData && challengeData.user) {
      const { pendingChallenges, ongoingChallenges } = convertChallenge(challengeData);
      setPendingChallenges(pendingChallenges);
      setOngoingChallenges(ongoingChallenges);
    }
  }, [challengeData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colors.blue} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>{error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {ongoingChallenges && renderOngoingChallenges(ongoingChallenges, refetch)}
      {pendingChallenges && renderPendingChallenges(props, pendingChallenges, refetch)}

      <View style={styles.box}>
        <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Create new Challenge</Text>
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={{ ...Buttons.buttonText }}>Create challenge</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const renderPendingChallenges = (
  { navigation }: ChallengesProps,
  pendingChallenges: PendingChallenge[],
  refetch: () => void,
) => {
  return (
    <View style={styles.box}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
        Accept the challenges to compete with other players.
      </Text>
      <PendingChallengeCard challenge={pendingChallenges[0]} />
      {pendingChallenges.length > 1 && (
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => navigation.push('Pending challenges', { pendingChallenges, refetch })}>
          <Text style={{ ...Buttons.buttonText }}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const renderOngoingChallenges = (ongoingChallenges: OngoingChallenge[], refetch: () => void) => {
  return (
    <View style={styles.box}>
      <View style={styles.box}>
        <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing Challenges</Text>
        <OngoingChallengesList challenges={ongoingChallenges} refetch={refetch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '20%',
  },
  box: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  challengeButton: {
    ...Buttons.button,
    backgroundColor: Colors.green,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});

export default ChallengeScreen;
