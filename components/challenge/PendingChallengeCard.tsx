import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Colors, Typography, Spacing, Buttons } from '../../theme';
import { PendingChallenge } from '../../types/challengeTypes';

interface PendingChallengeCardProps {
  challenge: PendingChallenge;
}

const PendingChallengeCard: React.FC<PendingChallengeCardProps> = ({ challenge }: PendingChallengeCardProps) => {
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

        <View style={styles.buttonsContainer}>
          <AcceptButton />
          <DeclineButton />
        </View>
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
        <View style={styles.buttonsContainer}>
          <AcceptButton />
          <AcceptButton />
        </View>
      </View>
    );
  } else return <Text>{challenge.end_date.toString()}</Text>;
};

//const AcceptButton = (onPress?: () => void) => (
const AcceptButton = () => (
  <TouchableOpacity style={styles.acceptButton}>
    <Text style={{ ...Buttons.buttonText }}>Accept</Text>
  </TouchableOpacity>
);
const DeclineButton = () => (
  <TouchableOpacity style={styles.declineButton}>
    <Text style={[{ ...Buttons.buttonText }, { color: Colors.gray500 }]}>Decline</Text>
  </TouchableOpacity>
);
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    width: '100%',
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
