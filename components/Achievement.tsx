import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Spacing } from '../theme';
import { GeoFenceCategory } from '../types/geoFenceTypes';
import { Achievement as AchievementType } from '../types/profileTypes';
import { Typography } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

interface AchievementProps {
  achievement: AchievementType;
}
export const getAchievementIcon = (name: string) => {
  switch (name) {
    case GeoFenceCategory.CULTURE:
      return 'theater-masks';
    case GeoFenceCategory.SOCIAL:
      return 'users';
    case GeoFenceCategory.EXERCISE:
      return 'dumbbell';
    case GeoFenceCategory.EDUCATION:
      return 'graduation-cap';
    default:
      return 'question-circle';
  }
};

export const getAchievementColor = (level: number) => {
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

const Achievement: React.FC<AchievementProps> = ({ achievement }: AchievementProps) => {
  return (
    <View style={styles.achievement}>
      <View style={styles.trophy}>
        <FAIcon name={'star'} style={styles.icon}></FAIcon>
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
    backgroundColor: Colors.bronze,
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
