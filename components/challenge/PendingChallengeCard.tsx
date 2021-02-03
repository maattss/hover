import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useUpdateChallengeParticipationMutation } from '../../graphql/mutations/UpdateChallengeParticipation.generated';
import { Colors, Typography, Spacing, Buttons } from '../../theme';
import { PendingChallenge } from '../../types/challengeTypes';
import { Challenge_Participant_State_Enum } from '../../types/types';

interface PendingChallengeCardProps {
  challenge: PendingChallenge;
}

const PendingChallengeCard: React.FC<PendingChallengeCardProps> = ({ challenge }: PendingChallengeCardProps) => {
  const [partcipationState, setPartcipationState] = useState<Challenge_Participant_State_Enum>(
    Challenge_Participant_State_Enum.Pending,
  );
  console.log(challenge.user_id);
  const [updateMutation] = useUpdateChallengeParticipationMutation();

  const UpdateButton = ({
    state,
  }: {
    state: Challenge_Participant_State_Enum.Accepted | Challenge_Participant_State_Enum.Declined;
  }) => {
    let buttonStyle: ViewStyle = styles.acceptButton;
    const buttonTextStyle: TextStyle[] = [{ ...Buttons.buttonText }];
    let buttonText = 'Accept';
    if (state === Challenge_Participant_State_Enum.Declined) {
      buttonStyle = styles.declineButton;
      buttonTextStyle.push({ color: Colors.gray600 });
      buttonText = 'Decline';
    }

    return (
      <TouchableOpacity
        style={buttonStyle}
        onPress={() => {
          updateMutation({
            variables: {
              challenge_id: challenge.id,
              user_id: challenge.user_id,
              state: state,
            },
          }).then(() => setPartcipationState(state));
          console.log(state, 'challenge', challenge.id, challenge);
        }}>
        <Text style={buttonTextStyle}>{buttonText}</Text>
      </TouchableOpacity>
    );
  };
  const ParticipantButtonSwitch = () => {
    switch (partcipationState) {
      case Challenge_Participant_State_Enum.Pending:
        return (
          <View style={styles.buttonsContainer}>
            <UpdateButton state={Challenge_Participant_State_Enum.Accepted} />
            <UpdateButton state={Challenge_Participant_State_Enum.Declined} />
          </View>
        );
      case Challenge_Participant_State_Enum.Accepted:
        return (
          <View style={styles.buttonsContainer}>
            <Text>You accepted the challenge</Text>
          </View>
        );
      case Challenge_Participant_State_Enum.Declined:
        return (
          <View style={styles.buttonsContainer}>
            <Text>You declined the challenge</Text>
          </View>
        );
    }
  };

  if (challenge.opponents.length == 1) {
    const opponent = challenge.opponents[0];
    return (
      <View style={styles.card}>
        <View style={styles.topBar}>
          <Image source={{ uri: opponent.picture }} style={styles.avatar} />
          <View>
            <Text style={styles.nameText}>{opponent.name}</Text>
            <Text style={styles.captionText}>{challenge.challenge_type}</Text>
          </View>
        </View>
        <ParticipantButtonSwitch />
      </View>
    );
  } else if (challenge.opponents.length > 1) {
    return (
      <View style={styles.card}>
        <View style={styles.topBar}>
          {challenge.opponents.map((opponent) => (
            <>
              <Image key={opponent.id} source={{ uri: opponent.picture }} style={styles.avatar} />
              <View>
                <Text style={styles.nameText}>{opponent.name}</Text>
                <Text style={styles.captionText}>{challenge.challenge_type}</Text>
              </View>
            </>
          ))}
        </View>

        <View>
          {challenge.opponents.map((opponent) => (
            <Text key={opponent.id} style={styles.nameText}>
              {opponent.name}
            </Text>
          ))}
        </View>
        <ParticipantButtonSwitch />
      </View>
    );
  } else return <Text>{challenge.end_date.toString()}</Text>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 30,
  },
  captionText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
  },
  scoreText: {
    color: Colors.almostWhite,
    fontSize: 24,
    textAlign: 'center',
  },
  main: {
    marginVertical: Spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    width: '30%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: Spacing.base,
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
  map: {
    width: '70%',
    height: 110,
    borderRadius: Spacing.smallest,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptButton: {
    width: '45%',
    ...Buttons.button,
    backgroundColor: Colors.blue,
    marginVertical: Spacing.base,
  },
  declineButton: {
    width: '45%',
    ...Buttons.button,
    backgroundColor: Colors.gray100,
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});

export default PendingChallengeCard;
