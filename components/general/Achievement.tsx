import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Spacing } from '../../theme';
import { Typography } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { AchievementFragmentFragment } from '../../graphql/Fragments.generated';
import { Achievement_Type_Enum } from '../../types/types';
import * as Progress from 'react-native-progress';
import { hexToRGB } from '../../theme/colors';

interface AchievementProps {
  achievement: AchievementFragmentFragment;
  achieved?: boolean;
  progress?: number;
}
export const getAchievementIcon = (achievement: AchievementFragmentFragment) => {
  switch (achievement.achievement_type) {
    case Achievement_Type_Enum.Score:
      return 'trophy';
    case Achievement_Type_Enum.ScoreInCategory:
      const category = GeoFenceCategory[achievement.rule.category as keyof typeof GeoFenceCategory];
      return getCategoryIconName(category);
    case Achievement_Type_Enum.FirstActivity:
      return 'award';
    case Achievement_Type_Enum.Streak:
      return 'fire';
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

export const getAchievementColor = (level: number, achieved = true) => {
  let color;
  switch (level) {
    case 1:
      color = Colors.gold;
      break;
    case 2:
      color = Colors.silver;
      break;
    case 3:
      color = Colors.bronze;
      break;
    default:
      color = Colors.gray800;
      break;
  }
  if (!achieved) color = hexToRGB(color, 0.4);
  return color;
};

const Achievement: React.FC<AchievementProps> = ({ achievement, achieved = true, progress }: AchievementProps) => {
  const trophyBorderColor = {
    borderColor: getAchievementColor(achievement.level, achieved),
  };
  const iconColor = {
    color: getAchievementColor(achievement.level, achieved),
  };

  return (
    <View style={styles.achievement}>
      <View style={[styles.trophy, trophyBorderColor]}>
        <FAIcon name={getAchievementIcon(achievement)} style={[styles.icon, iconColor]}></FAIcon>
      </View>
      {achieved ? (
        <Text style={styles.text}>{achievement.name}</Text>
      ) : (
        <Progress.Bar
          style={styles.progress}
          progress={progress ?? 0}
          height={10}
          width={100}
          borderColor={Colors.blue}
          color={Colors.blue}
          borderWidth={2}
        />
      )}
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
  progress: {
    marginVertical: Spacing.smaller,
  },
});

export default Achievement;
