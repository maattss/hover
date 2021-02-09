import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Divider from '../general/Divider';
import { OngoingChallenge } from '../../types/challengeTypes';
import { Avatar } from 'react-native-elements';

interface OngoingChallengeCardProps {
  challenge: OngoingChallenge;
}

const OngoingChallengeCard: React.FC<OngoingChallengeCardProps> = ({ challenge }: OngoingChallengeCardProps) => {
  const Opponents = () => {
    switch (challenge.opponents.length) {
      case 2: {
        return (
          <View style={styles.row}>
            <View style={styles.colum}>
              <Avatar rounded source={{ uri: challenge.user.picture ?? '' }} size="medium" />
              <Text style={styles.nameText}>{challenge.user.name}</Text>
            </View>
            {challenge.opponents.map((opponent) => (
              <View key={opponent.user.id} style={styles.colum}>
                <Avatar rounded source={{ uri: opponent.user.picture ?? '' }} size="medium" />
                <Text style={styles.nameText}>{opponent.user.name}</Text>
              </View>
            ))}
          </View>
        );
      }
      default: {
        return (
          <View>
            <View style={styles.row}>
              <View style={styles.colum}>
                <Avatar rounded source={{ uri: challenge.created_by.picture ?? '' }} size="medium" />
                <Text style={styles.nameText}>{challenge.user.name}</Text>
              </View>
              <View style={styles.versus}>
                <Text style={styles.versusText}>vs</Text>
              </View>
              <View style={styles.colum}>
                <Avatar rounded source={{ uri: challenge.created_by.picture ?? '' }} size="medium" />
                <Text style={styles.nameText}>{challenge.created_by.name}</Text>
              </View>
            </View>
            {challenge.opponents.length > 1 && (
              <View style={styles.row}>
                <View>
                  <Text style={styles.opponentHeaderText}>Other partcicipants</Text>
                  {challenge.opponents
                    .filter((opponent) => opponent.user.id != challenge.created_by.id)
                    .map((opponent) => (
                      <View key={opponent.user.id} style={styles.opponentRow}>
                        <Avatar rounded source={{ uri: opponent.user.picture ?? '' }} size="medium" />
                        <View style={styles.opponentNameStateRow}>
                          <Text style={styles.opponentNameText}>{opponent.user.name}</Text>
                          <Text style={styles.opponentStateText}>{opponent.state}</Text>
                        </View>
                      </View>
                    ))}
                </View>
              </View>
            )}
          </View>
        );
      }
    }
  };

  return (
    <View style={styles.card}>
      <Opponents />
      <Divider />
      <Text style={styles.challengeText}>{challenge.challenge_type}</Text>

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
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
    shadowOpacity: 0.75,
    shadowRadius: 3,
    shadowColor: Colors.black,
    shadowOffset: { height: 0, width: 0 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  colum: {
    marginTop: Spacing.smaller,
    alignItems: 'center',
    width: '50%',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 15,
    paddingRight: Spacing.smallest,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    backgroundColor: 'green',
  },
  versus: {
    justifyContent: 'center',
  },
  versusText: {
    color: Colors.almostWhite,
    fontSize: 16,
    textAlign: 'center',
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
    marginBottom: Spacing.base,
  },
  opponentAvatar: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginRight: Spacing.small,
  },
  opponentNameStateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
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
  challengeText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
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
