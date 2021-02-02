import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Spacing } from '../theme';
import { Achievement as AchievementType, AchievementVariant } from '../types/profileTypes';
import { Typography } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

interface AchievementProps {
  achievement: AchievementType;
}
export const getAchievementIcon = (variant: AchievementVariant) => {
  switch (variant) {
    case AchievementVariant.SCORE:
      return 'star';
    case AchievementVariant.SCORE_IN_CATEGORY:
      return 'star-half';
    case AchievementVariant.FIRST_ACTIVITY:
      return 'award';
    default:
      return 'medal';
  }
};

export const getAchievementBgColor = (level: number) => {
  switch (level) {
    case 1:
      return Colors.gold;
    case 2:
      return Colors.silver;
    case 3:
      return Colors.bronze;
    default:
      return Colors.gray800;
  }
};
export const getAchievementColor = (level: number) => {
  switch (level) {
    case 1:
      return Colors.almostBlack;
    case 2:
      return Colors.almostBlack;
    case 3:
      return Colors.almostWhite;
    default:
      return Colors.almostWhite;
  }
};

const Achievement: React.FC<AchievementProps> = ({ achievement }: AchievementProps) => {
  const trophyBgColor = {
    backgroundColor: getAchievementBgColor(achievement.level),
  };
  const iconColor = {
    color: getAchievementColor(achievement.level),
  };
  return (
    <View style={styles.achievement}>
      <View style={[styles.trophy, trophyBgColor]}>
        <FAIcon name={getAchievementIcon(achievement.type)} style={[styles.icon, iconColor]}></FAIcon>
      </View>
      <Text style={styles.text}>{achievement.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  trophy: {
    height: 80,
    width: 80,
    justifyContent: 'center',
    borderRadius: Spacing.extraLarge,
    margin: Spacing.smaller,
  },
  text: {
    ...Typography.largeBodyText,
  },
  achievement: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 45,
    textAlign: 'center',
    color: Colors.almostWhite,
  },
});

export default Achievement;
