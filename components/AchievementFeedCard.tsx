import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { AchievementFeedData } from '../types/feedTypes';
import { timeStampToPresentable } from '../helpers/dateTimeHelpers';

interface AchievementFeedCardProps {
  achievement: AchievementFeedData;
}

const AchievementFeedCard: React.FC<AchievementFeedCardProps> = (props: AchievementFeedCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Image source={{ uri: props.achievement.picture }} style={styles.avatar} />
        <Text style={styles.nameText}>{props.achievement.userName}</Text>
      </View>
      <View style={styles.trophy}>
        <FAIcon style={styles.trophyIcon} name={'award'} />
      </View>
      <View style={styles.main}>
        <Text style={styles.descriptionText}>{props.achievement.description}</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.timeStamp}>{timeStampToPresentable(props.achievement.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    left: Spacing.base,
    top: Spacing.base,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameText: {
    ...Typography.headerText,
    lineHeight: 60,
  },
  descriptionText: {
    ...Typography.headerText,
  },
  main: {
    marginTop: 55,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  trophy: {
    position: 'absolute',
    right: Spacing.base,
    top: Spacing.base,
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
    position: 'absolute',
    left: Spacing.base,
    bottom: Spacing.base,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: Colors.gray900,
    height: 140,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: Spacing.small,
  },
  timeStamp: {
    ...Typography.largeBodyText,
    fontStyle: 'italic',
  },
});

export default AchievementFeedCard;
