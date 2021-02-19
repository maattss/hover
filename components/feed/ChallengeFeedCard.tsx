import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { ChallengeFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { generateOngoingChallengeDescription } from '../../helpers/decriptionHelper';

interface ChallengeFeedCardProps {
  data: ChallengeFeedData;
}

const ChallengeFeedCard: React.FC<ChallengeFeedCardProps> = ({ data }: ChallengeFeedCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Image
          source={{ uri: data.user.picture ? data.user.picture : defaultUserProfile.picture }}
          style={styles.avatar}
        />
        <Text style={styles.nameText}>{data.user.name}</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{generateOngoingChallengeDescription(data.challenge)}</Text>
        </View>
        <View style={styles.challenge}></View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(data.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 50,
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '65%',
  },
  descriptionText: {
    ...Typography.headerText,
    fontSize: 24,
    flexWrap: 'wrap',
    flexDirection: 'column',
    maxWidth: '100%',
    paddingLeft: Spacing.smaller,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.smaller,
    width: '100%',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
  challenge: {
    marginTop: -40,
    width: '35%',
  },
});

export default ChallengeFeedCard;
