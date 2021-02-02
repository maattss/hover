import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import Divider from '../Divider';
import { PendingChallenge } from '../../types/challengeTypes';

interface PendingChallengeCardProps {
  challenge: PendingChallenge;
}

const PendingChallengeCard: React.FC<PendingChallengeCardProps> = ({ challenge }: PendingChallengeCardProps) => {
  if (challenge.opponents.length >= 1) {
    return (
      <View style={styles.card}>
        <View style={styles.topBar}>
          <Text style={styles.titleText}>Challenge accepted!</Text>
        </View>
        <View style={styles.avatarContainer}>
          {challenge.opponents.map((opponent) => (
            <Image key={opponent.id} source={{ uri: opponent.picture }} style={styles.avatar} />
          ))}
        </View>

        <View style={styles.nameContainer}>
          {challenge.opponents.map((opponent, index) => (
            <Text key={index} style={styles.nameText}>
              {opponent.name}
            </Text>
          ))}
        </View>
        <Divider />
        <Text style={styles.challengeText}>{challenge.challenge_type}</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{challenge.end_date.toString()}</Text>
        </View>
      </View>
    );
  } else return <Text style={styles.footerText}>{challenge.end_date.toString()}</Text>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    ...Typography.headerText,
    fontSize: 28,
    lineHeight: 35,
  },
  description: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    paddingRight: Spacing.smallest,
  },
  nameContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginVertical: Spacing.smallest,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginHorizontal: 75,
  },
  avatarContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: Spacing.smaller,
  },
  challengeText: {
    color: Colors.almostWhite,
    fontSize: 16,
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

export default PendingChallengeCard;
