import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { ChallengeFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Divider from '../Divider';

interface ChallengeFeedCardProps {
  challenge: ChallengeFeedData;
}

const ChallengeFeedCard: React.FC<ChallengeFeedCardProps> = (props: ChallengeFeedCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Text style={styles.titleText}>Challenge accepted!</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Image source={{ uri: props.challenge.userPicture1 }} style={styles.avatar} />
        <Image source={{ uri: props.challenge.userPicture2 }} style={styles.avatar} />
      </View>

      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>{props.challenge.userName1}</Text>
        <Text style={styles.nameText}>vs</Text>
        <Text style={styles.nameText}>{props.challenge.userName2}</Text>
      </View>
      <Divider />
      <Text style={styles.challengeText}>{props.challenge.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(props.challenge.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  card: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },

  timeStamp: {
    ...Typography.largeBodyText,
    fontStyle: 'italic',
  },
});

export default ChallengeFeedCard;
