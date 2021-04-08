import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import Divider from '../general/Divider';
import { Challenge } from '../../types/challengeTypes';
import { Avatar } from 'react-native-elements';
import { generateOngoingChallengeDescription } from '../../helpers/decriptionHelper';
import { Challenge_Participant_State_Enum, Challenge_Type_Enum } from '../../types/types';
import { OpponentFragmentFragment, ChallengeFeedFragmentFragment } from '../../graphql/Fragments.generated';
import TouchableProfile from '../general/TouchableProfile';
import { defaultUserProfile } from '../../helpers/objectMappers';
import * as Progress from 'react-native-progress';
import * as Analytics from 'expo-firebase-analytics';

interface ChallengeOpponentsProps {
  challenge: Challenge | ChallengeFeedFragmentFragment;
}
export const ChallengeOpponents: React.FC<ChallengeOpponentsProps> = ({ challenge }: ChallengeOpponentsProps) => {
  const getProgressPercentage = (opponent: OpponentFragmentFragment) => {
    let percentage = 0;
    if (
      challenge.challenge_type == Challenge_Type_Enum.Score ||
      challenge.challenge_type == Challenge_Type_Enum.ScoreCategory
    ) {
      percentage = opponent.progress && challenge.rules.score ? opponent.progress / challenge.rules.score : 0;
    } else if (
      challenge.challenge_type == Challenge_Type_Enum.Time ||
      challenge.challenge_type == Challenge_Type_Enum.TimeCategory
    ) {
      percentage = opponent.progress && challenge.rules.time ? opponent.progress / challenge.rules.time : 0;
    }
    return percentage > 1 ? 1 : percentage;
  };

  const getColor = (opponent: OpponentFragmentFragment) => {
    return opponent.state == Challenge_Participant_State_Enum.Accepted ? Colors.blue : Colors.gray700;
  };

  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.opponentHeaderText}>Participants</Text>
        {challenge.opponents.map((opponent, index) => {
          return (
            <TouchableProfile
              key={index}
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
                  <Avatar rounded source={{ uri: opponent.user.picture ?? defaultUserProfile.picture }} size="small" />
                </View>
                <View style={styles.opponentInfo}>
                  <View style={styles.opponentNameStateRow}>
                    <Text style={styles.opponentNameText}>{opponent.user.name}</Text>
                    <Text style={styles.opponentStateText}>Status: {opponent.state.toLowerCase()}</Text>
                  </View>

                  <View style={styles.opponentProgressRow}>
                    {opponent.state !== Challenge_Participant_State_Enum.Declined && (
                      <Progress.Bar
                        progress={getProgressPercentage(opponent)}
                        height={10}
                        width={null}
                        borderColor={getColor(opponent)}
                        color={getColor(opponent)}
                        borderWidth={2}
                      />
                    )}
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
            <Text style={styles.captionText}>{generateOngoingChallengeDescription(challenge)}</Text>
          </View>
        </View>
      </TouchableProfile>
      <Divider />
      <ChallengeOpponents challenge={challenge as Challenge} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    paddingBottom: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    justifyContent: 'center',
    flexShrink: 1,
    paddingBottom: Spacing.smallest,
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
    flexWrap: 'wrap',
  },
  opponentHeaderText: {
    color: Colors.almostWhite,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: Spacing.smallest,
    marginBottom: Spacing.small,
  },
  opponentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.base,
  },
  opponentNameStateRow: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  opponentProgressRow: {
    width: '85%',
    marginTop: Spacing.smallest,
  },
  opponentNameText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
  },
  opponentStateText: {
    ...Typography.bodyText,
    fontSize: 10,
    fontStyle: 'italic',
  },
});

export default OngoingChallengeCard;
