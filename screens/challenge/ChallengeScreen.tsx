import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Challenge_Participant_Insert_Input,
  Challenge_Type_Enum,
  useInsertChallengeMutation,
} from '../../graphql/mutations/InsertChallenge.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';

const ChallengeScreen: React.FC = () => {
  const [challengeType, setChallengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  const [endDate, setEndDate] = useState<Date>(new Date('2021-02-11'));
  const [participants, setParticipants] = useState<Challenge_Participant_Insert_Input[]>([
    { user_id: 'vFRT8aC4F0bCqSJoQcHZ1xXUdEo1' },
    { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' },
  ]);

  const [createChallenge, { data }] = useInsertChallengeMutation({
    variables: { challenge_type: challengeType, end_date: endDate, participants: participants },
  });

  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Challenge screen</Text>

      <TouchableOpacity style={styles.challengeButton} onPress={() => createChallenge}>
        <Text style={{ ...Buttons.buttonText }}>Create challenge</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
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
