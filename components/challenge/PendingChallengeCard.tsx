import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-elements';
import { useUpdateChallengeParticipationMutation } from '../../graphql/mutations/UpdateChallengeParticipation.generated';
import { generateDescription } from '../../helpers/decriptionHelper';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { Colors, Typography, Spacing, Buttons } from '../../theme';
import { Challenge } from '../../types/challengeTypes';
import { Challenge_Participant_State_Enum } from '../../types/types';
import TouchableProfile from '../general/TouchableProfile';
import * as Analytics from 'expo-firebase-analytics';

interface PendingChallengeCardProps {
  challenge: Challenge;
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
    const buttonTextStyle: TextStyle[] = [];
    const buttonStyle: ViewStyle[] = [];
    let buttonText = '';

    if (state === Challenge_Participant_State_Enum.Accepted) {
      buttonText = 'Accept';
      buttonStyle.push(styles.acceptButton);
      buttonTextStyle.push({ ...Buttons.buttonText });
    }

    if (state === Challenge_Participant_State_Enum.Declined) {
      buttonText = 'Decline';
      buttonStyle.push(styles.declineButton);
      buttonTextStyle.push({ color: Colors.almostBlack });
    }

    const updateChallengeParticipation = () => {
      updateMutation({
        variables: {
          challenge_id: challenge.id,
          user_id: challenge.user.id,
          state: state,
        },
      }).then(() => setPartcipationState(state));
    };

    return (
      <TouchableOpacity style={buttonStyle} onPress={updateChallengeParticipation}>
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
            <Text style={styles.stateUpdateMessage}>You accepted the challenge. Game on!</Text>
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
  const opponents = challenge.opponents.filter(
    (opponent) => opponent.user.id != challenge.created_by.id && opponent.user.id == challenge.user.id,
  );

  return (
    <View style={styles.card}>
      <TouchableProfile
        user_id={challenge.created_by.id}
        name={challenge.created_by.name}
        onPress={() =>
          Analytics.logEvent('visit_profile', {
            navigateFrom: 'ChallengeScreen',
            user: challenge.created_by.id,
            navigateTo: 'ProfileScreen',
            purpose: 'Viewing more info on a user',
          })
        }>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              source={{ uri: challenge.created_by.picture ?? defaultUserProfile.picture }}
              size="medium"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{challenge.created_by.name}</Text>
            <Text style={styles.descriptionText}>{generateDescription(challenge)}</Text>
          </View>
        </View>
      </TouchableProfile>
      {opponents.length > 1 && (
        <View style={styles.opponentContainer}>
          <Text style={styles.opponentHeaderText}>Other partcicipants</Text>
          {opponents.map((opponent) => (
            <TouchableProfile
              key={opponent.user.id}
              user_id={opponent.user.id}
              name={opponent.user.name}
              onPress={() =>
                Analytics.logEvent('visit_profile', {
                  navigateFrom: 'ChallengeScreen',
                  user: opponent.user.id,
                  navigateTo: 'ProfileScreen',
                  purpose: 'Viewing more info on a user',
                })
              }>
              <View style={styles.opponentRow}>
                <View style={styles.opponentAvatar}>
                  <Avatar rounded source={{ uri: opponent.user.picture ?? defaultUserProfile.picture }} size="medium" />
                </View>
                <View style={styles.oppnentNameStateRow}>
                  <Text style={styles.opponentNameText}>{opponent.user.name}</Text>
                  <Text style={styles.opponentStateText}>{opponent.state}</Text>
                </View>
              </View>
            </TouchableProfile>
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
    marginVertical: Spacing.smallest,
  },
  avatar: {
    marginRight: Spacing.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    justifyContent: 'center',
    flexShrink: 1,
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
    ...Typography.bodyText,
    marginTop: Spacing.base,
    marginBottom: Spacing.smallest,
    textAlign: 'center',
    fontWeight: 'bold',
    width: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptButton: {
    ...Buttons.button,
    width: '48%',
    backgroundColor: Colors.blue,
    marginTop: Spacing.small,
  },
  declineButton: {
    ...Buttons.button,
    width: '48%',
    backgroundColor: Colors.gray100,
    marginTop: Spacing.small,
  },
});

export default PendingChallengeCard;
