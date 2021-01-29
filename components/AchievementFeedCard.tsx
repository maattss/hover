import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { AchievementFeedData } from '../types/feedTypes';

interface AchievementFeedCardProps {
  achievement: AchievementFeedData;
}

const AchievementFeedCard: React.FC<AchievementFeedCardProps> = (props: AchievementFeedCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Text style={{ ...Typography.largeBodyText }}>{props.achievement.name}</Text>
        <Image source={{ uri: props.achievement.picture }} style={styles.avatar} />
      </View>
      <View style={styles.main}>
        <View style={styles.trophy}>
          <FAIcon style={styles.trophyIcon} name={'trophy'} />
          <FAIcon style={styles.trophyIcon} name={'award'} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{ ...Typography.largeBodyText }}>21.01.21 12.00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {},
  main: {},
  trophy: {},
  trophyIcon: {},
  map: {},
  footer: {},
  card: {
    backgroundColor: Colors.gray900,
    height: 100,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
});

export default AchievementFeedCard;
