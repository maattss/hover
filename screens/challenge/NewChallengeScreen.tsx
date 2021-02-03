import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import useAuthentication from '../../hooks/useAuthentication';
import { useInsertChallengeMutation } from '../../graphql/mutations/InsertChallenge.generated';
import { Challenge_Participant_Insert_Input, Challenge_Type_Enum } from '../../types/types';

const ChallengeScreen: React.FC = () => {
  const user_id = useAuthentication().user?.uid;
  const [challengeType, setChallengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  const [endDate, setEndDate] = useState<Date>(new Date('2021-02-11'));
  const [participants, setParticipants] = useState<Challenge_Participant_Insert_Input[]>([
    { user_id: user_id, accepted: true },
    { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' },
  ]);

  const [createChallenge, { data, loading, error }] = useInsertChallengeMutation({
    variables: { challenge_type: challengeType, end_date: endDate, participants: participants },
  });

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
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Create new Challenge</Text>
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={{ ...Buttons.buttonText }}>Create challenge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
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
    marginVertical: Spacing.smaller,
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
