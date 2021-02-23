import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Divider from '../general/Divider';
import { Challenge } from '../../types/challengeTypes';
import { Avatar } from 'react-native-elements';
import { generateOngoingChallengeDescription } from '../../helpers/decriptionHelper';
import { Challenge_Participant_State_Enum, Challenge_Type_Enum } from '../../types/types';
import { OpponentFragmentFragment, ChallengeFeedFragmentFragment } from '../../graphql/Fragments.generated';
import TouchableProfile from '../general/TouchableProfile';
import { defaultUserProfile } from '../../helpers/objectMappers';

interface ChallengeOpponentsProps {
  challenge: Challenge | ChallengeFeedFragmentFragment;
}
export const ChallengeOpponents: React.FC<ChallengeOpponentsProps> = ({ challenge }: ChallengeOpponentsProps) => {
  const getProgressPercentage = (opponent: OpponentFragmentFragment) => {
    let width = 0;
    if (
      challenge.challenge_type == Challenge_Type_Enum.Score ||
      challenge.challenge_type == Challenge_Type_Enum.ScoreCategory
    ) {
      width = opponent.progress && challenge.rules.score ? (opponent.progress / challenge.rules.score) * 100 : 0;
    } else if (
      challenge.challenge_type == Challenge_Type_Enum.Time ||
      challenge.challenge_type == Challenge_Type_Enum.TimeCategory
    ) {
      width = opponent.progress && challenge.rules.time ? (opponent.progress / challenge.rules.time) * 100 : 0;
    }
    return (width > 100 ? 100 : width) + '%';
  };
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.opponentHeaderText}>Challenge partcicipants</Text>
        {challenge.opponents.map((opponent, index) => {
          return (
            <TouchableProfile key={index} user_id={opponent.user.id} name={opponent.user.name}>
              <View style={styles.opponentRow}>
                <View style={styles.opponentAvatar}>
                  <Avatar rounded source={{ uri: opponent.user.picture ?? defaultUserProfile.picture }} size="small" />
                </View>
                <View style={styles.opponentInfo}>
                  <View style={styles.opponentNameStateRow}>
                    <Text style={styles.opponentNameText}>{opponent.user.name}</Text>
                    <Text style={styles.opponentStateText}>{opponent.state}</Text>
                  </View>

                  <View style={styles.opponentNameStateRow}>
                    <View style={styles.progressBar}>
                      {opponent.state != Challenge_Participant_State_Enum.Declined && (
                        <Animated.View
                          style={[
                            [StyleSheet.absoluteFill],
                            {
                              backgroundColor:
                                opponent.state == Challenge_Participant_State_Enum.Accepted
                                  ? Colors.blue
                                  : Colors.gray500,
                              borderRadius: 5,
                              width: getProgressPercentage(opponent),
                            },
                          ]}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </TouchableProfile>
          );
        })}
      </View>
    </View>
  );
};
interface OngoingChallengeCardProps {
  challenge: Challenge;
}

const OngoingChallengeCard: React.FC<OngoingChallengeCardProps> = ({ challenge }: OngoingChallengeCardProps) => {
  return (
    <View style={styles.card}>
      <TouchableProfile user_id={challenge.created_by.id} name={challenge.created_by.name}>
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
            <Text style={styles.captionText}>{generateOngoingChallengeDescription(challenge)}</Text>
          </View>
        </View>
      </TouchableProfile>
      <Divider />
      <ChallengeOpponents challenge={challenge as Challenge} />
      <Divider />

      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(challenge.created_at)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    justifyContent: 'center',
    flexShrink: 1,
  },
  colum: {
    marginTop: Spacing.smaller,
    alignItems: 'center',
    width: '50%',
  },
  avatar: {
    marginRight: Spacing.base,
  },
  opponentAvatar: {
    marginRight: Spacing.small,
    width: '10%',
  },
  opponentInfo: {
    width: '90%',
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
    flexWrap: 'wrap',
  },
  progressBar: {
    height: 10,
    width: '100%',
    backgroundColor: Colors.almostWhite,
    borderColor: Colors.almostBlack,
    borderWidth: 2,
    borderRadius: 5,
  },
  opponentHeaderText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: Spacing.base,
  },
  opponentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.base,
  },
  opponentNameStateRow: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    flexShrink: 1,
  },
  opponentNameText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    width: '70%',
  },
  opponentStateText: {
    ...Typography.bodyText,
    fontSize: 10,
    fontStyle: 'italic',
    width: '30%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: Spacing.smaller,
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default OngoingChallengeCard;
