import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useInsertChallengeMutation } from '../../graphql/mutations/InsertChallenge.generated';
import { useGetChallengesQuery } from '../../graphql/queries/GetChallenges.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import useAuthentication from '../../hooks/useAuthentication';
import { Challenge_Participant_Insert_Input, Challenge_Type_Enum } from '../../types/types';
import { PendingChallenge } from '../../types/challengeTypes';
import PendingChallengeCard from '../../components/challenge/PendingChallengeCard';
import { convertChallenge } from '../../helpers/objectMappers';
import { FlatList } from 'react-native-gesture-handler';

const ChallengeScreen: React.FC = () => {
  const user_id = useAuthentication().user?.uid;
  const [refreshing, setRefreshing] = useState(false);
  const [challengeType, setChallengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  const [endDate, setEndDate] = useState<Date>(new Date('2021-02-11'));
  const [participants, setParticipants] = useState<Challenge_Participant_Insert_Input[]>([
    { user_id: 'vFRT8aC4F0bCqSJoQcHZ1xXUdEo1', accepted: true },
    { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' },
  ]);

  const [createChallenge, { data }] = useInsertChallengeMutation({
    variables: { challenge_type: challengeType, end_date: endDate, participants: participants },
  });

  const [pendingChallenges, setPendingChallenges] = useState<PendingChallenge[]>();
  // const [ongoingChallenges, setOngoingChallenges] = useState<PendingChallenge[]>();

  const { data: challengeData, loading, error, refetch } = useGetChallengesQuery({
    variables: { user_id: user_id ? user_id : '' },
  });

  useEffect(() => {
    if (challengeData && challengeData.user) {
      const { pendingChallenges } = convertChallenge(challengeData);
      console.log('challengeData', challengeData.user);
      console.log('pendingChallenges', pendingChallenges);
      setPendingChallenges(pendingChallenges);
      console.error(pendingChallenges, challengeData);
    }
  }, [challengeData]);

  const onRefresh = useCallback(async () => {
    if (refetch) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  const renderItem = (item: PendingChallenge) => <PendingChallengeCard challenge={item} />;

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
        <Text>{error.message}</Text>
        {console.error(error.message)}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {pendingChallenges && (
        <View style={styles.box}>
          <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending Challenge screen</Text>
        </View>
      )}
      <TouchableOpacity style={styles.challengeButton} onPress={() => refetch}>
        <Text style={{ ...Buttons.buttonText }}>Refresh</Text>
      </TouchableOpacity>

      {challengeData?.user && challengeData.user?.ongoing_challenges && (
        <View style={styles.box}>
          <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing Challenges</Text>
        </View>
      )}

      <View style={styles.box}>
        <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Create new Challenge</Text>
        <TouchableOpacity style={styles.challengeButton} onPress={() => createChallenge}>
          <Text style={{ ...Buttons.buttonText }}>Create challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
