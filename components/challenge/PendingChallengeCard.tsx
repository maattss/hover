import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { useUpdateChallengeParticipationMutation } from '../../graphql/mutations/UpdateChallengeParticipation.generated';
import { generateDescription } from '../../helpers/decriptionHelper';
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
            <Text style={styles.stateUpdateMessage}>You accepted the challenge</Text>
          </View>
        );
      case Challenge_Participant_State_Enum.Declined:
        return (
          <View style={styles.buttonsContainer}>
            <Text style={styles.stateUpdateMessage}>You declined the challenge</Text>
          </View>
        );
    }
  };

  if (challenge.opponents.length == 1) {
    const opponent = challenge.opponents[0];
    return (
      <View style={styles.card}>
        <View style={styles.topBar}>
          <View style={styles.topBarAvatar}>
            <Image source={{ uri: opponent.picture }} style={styles.avatar} />
          </View>
          <View style={styles.topBarText}>
            <Text style={styles.nameText}>{opponent.name}</Text>
            <Text style={styles.descriptionText}>{generateDescription(challenge)}</Text>
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
              <View style={styles.topBarText}>
                <Text style={styles.nameText}>{opponent.name}</Text>
                <Text style={styles.descriptionText}>{challenge.challenge_type}</Text>
              </View>
            </>
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
  topBarAvatar: {
    width: '20%',
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
  topBarText: {
    width: '80%',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 30,
  },
  descriptionText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
  },
  stateUpdateMessage: {
    marginVertical: Spacing.base,
    ...Typography.bodyText,
    fontStyle: 'italic',
    width: '100%',
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
