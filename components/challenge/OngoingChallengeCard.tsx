import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Divider from '../Divider';
import { OngoingChallenge } from '../../types/challengeTypes';

interface OngoingChallengeCardProps {
  challenge: OngoingChallenge;
}

const OngoingChallengeCard: React.FC<OngoingChallengeCardProps> = ({ challenge }: OngoingChallengeCardProps) => {
  if (challenge.opponents.length == 1) {
    const opponent = challenge.opponents[0];
    return (
      <View style={styles.card}>
        <View style={styles.topBar}>
          <Text style={styles.titleText}>Challenge accepted!</Text>
        </View>

        <View style={styles.avatarContainer}>
          <Image source={{ uri: challenge.user.picture }} style={styles.avatar} />
          <Image source={{ uri: opponent.picture }} style={styles.avatar} />
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{challenge.user.name}</Text>
          <Text style={styles.nameText}>vs</Text>
          <Text style={styles.nameText}>{opponent.name}</Text>
        </View>
        <Divider />
        <Text style={styles.challengeText}>{challenge.challenge_type}</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{timeStampToPresentable(challenge.created_at)}</Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.card}>
        <View style={styles.topBar}>
          <Text style={styles.titleText}>Challenge accepted!</Text>
        </View>

        <View style={styles.avatarContainer}>
          <Image source={{ uri: challenge.user.picture }} style={styles.avatar} />
          {challenge.opponents.map((opponent) => (
            <Image key={opponent.id} source={{ uri: opponent.picture }} style={styles.avatar} />
          ))}
        </View>

        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{challenge.user.name}</Text>
          {challenge.opponents.map((opponent) => (
            <>
              <Text style={styles.nameText}>vs</Text>
              <Text style={styles.nameText}>{opponent.name}</Text>
            </>
          ))}
        </View>
        <Divider />
        <Text style={styles.challengeText}>{challenge.challenge_type}</Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{timeStampToPresentable(challenge.created_at)}</Text>
        </View>
      </View>
    );
  }
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

export default OngoingChallengeCard;
