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

export const getCategoryIconName = (category: GeoFenceCategory) => {
  switch (category) {
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
export const getCategoryColor = (category: GeoFenceCategory) => {
  switch (category) {
    case GeoFenceCategory.CULTURE:
      return Colors.almostWhite;
    case GeoFenceCategory.SOCIAL:
      return Colors.blue;
    case GeoFenceCategory.EXERCISE:
      return Colors.green;
    case GeoFenceCategory.EDUCATION:
      return Colors.red;
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
