import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
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
        <View style={styles.achievement}>
          <Achievement achievement={data.achievement} />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    ...Typography.headerText,
    fontSize: 24,
    flexWrap: 'wrap',
    width: '90%',
  },
  main: {
    flexDirection: 'row',
    marginBottom: Spacing.smaller,
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
  achievement: {
    marginLeft: -20,
    marginTop: -50,
  },
});

export default AchievementFeedCard;
