import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { AchievementFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Achievement from '../Achievement';

interface AchievementFeedCardProps {
  data: AchievementFeedData;
}

const AchievementFeedCard: React.FC<AchievementFeedCardProps> = ({ data }: AchievementFeedCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Image source={{ uri: data.picture }} style={styles.avatar} />
        <Text style={styles.nameText}>{data.userName}</Text>
      </View>

      <View style={styles.main}>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{data.achievement.description}</Text>
        </View>
        <Achievement achievement={data.achievement} />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(data.achievement.createdAt)}</Text>
      </View>
    </View>
  );
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
    justifyContent: 'flex-start',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 50,
  },
  description: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    ...Typography.headerText,
    fontSize: 24,
    paddingRight: Spacing.smallest,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.smaller,
  },
  trophy: {
    borderRadius: 70 / 2,
    height: 70,
    width: 70,
    backgroundColor: Colors.red,
    justifyContent: 'center',
  },
  trophyIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
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
});

export default AchievementFeedCard;
