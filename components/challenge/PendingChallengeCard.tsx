import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-elements';
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

  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <View style={styles.topBarAvatar}>
          <Avatar rounded source={{ uri: challenge.created_by.picture ?? '' }} size="medium" />
        </View>
        <View style={styles.topBarText}>
          <Text style={styles.nameText}>{challenge.created_by.name}</Text>
          <Text style={styles.descriptionText}>{generateDescription(challenge)}</Text>
        </View>
      </View>
      {challenge.opponents.length > 1 && (
        <View style={styles.opponentContainer}>
          <Text style={styles.opponentHeaderText}>Other partcicipants</Text>
          {challenge.opponents
            .filter((opponent) => opponent.user.id != challenge.created_by.id)
            .map((opponent) => (
              <View key={opponent.user.id} style={styles.opponentRow}>
                <Avatar rounded source={{ uri: opponent.user.picture ?? '' }} size="medium" />
                <View style={styles.oppnentNameStateRow}>
                  <Text style={styles.opponentNameText}>{opponent.user.name}</Text>
                  <Text style={styles.opponentStateText}>{opponent.state}</Text>
                </View>
              </View>
            ))}
        </View>
      )}

      <ParticipantButtonSwitch />
    </View>
  );
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
  opponentContainer: {
    paddingTop: Spacing.base,
    justifyContent: 'flex-end',
    width: '100%',
    left: '20%',
  },
  opponentHeaderText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: Spacing.base,
  },
  opponentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  opponentAvatar: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginRight: Spacing.small,
  },
  oppnentNameStateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  opponentNameText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    width: '60%',
  },
  opponentStateText: {
    ...Typography.bodyText,
    fontSize: 10,
    fontStyle: 'italic',
    width: '40%',
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
