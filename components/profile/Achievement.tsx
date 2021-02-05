import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Spacing } from '../../theme';
import { Achievement as AchievementType, AchievementVariant } from '../../types/profileTypes';
import { Typography } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { GeoFenceCategory } from '../../types/geoFenceTypes';

interface AchievementProps {
  achievement: AchievementType;
}
export const getAchievementIcon = (achievement: AchievementType) => {
  switch (achievement.type) {
    case AchievementVariant.SCORE:
      return 'trophy';
    case AchievementVariant.SCORE_IN_CATEGORY:
      const category = GeoFenceCategory[achievement.rule.category as keyof typeof GeoFenceCategory];
      return getCategoryIconName(category);
    case AchievementVariant.FIRST_ACTIVITY:
      return 'award';
    default:
      return 'medal';
  }
};
export const getCategoryIconName = (category: GeoFenceCategory | undefined) => {
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

const getAchievementColor = (level: number) => {
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
  const trophyBorderColor = {
    borderColor: getAchievementColor(achievement.level),
  };
  const iconColor = {
    color: getAchievementColor(achievement.level),
  };
  return (
    <View style={styles.achievement}>
      <View style={[styles.trophy, trophyBorderColor]}>
        <FAIcon name={getAchievementIcon(achievement)} style={[styles.icon, iconColor]}></FAIcon>
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
    marginBottom: Spacing.smallest,
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.gray900,
  },
  text: {
    ...Typography.largeBodyText,
  },
  achievement: {
    alignItems: 'center',
    padding: Spacing.smallest,
  },
  icon: {
    fontSize: 45,
    textAlign: 'center',
    color: Colors.almostWhite,
  },
});

export default Achievement;