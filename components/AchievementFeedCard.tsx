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
        <Image source={{ uri: props.achievement.picture }} style={styles.avatar} />
        <Text style={styles.nameText}>{props.achievement.name}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.trophy}>
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
  topBar: {
    position: 'absolute',
    left: Spacing.base,
    top: Spacing.base,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameText: {
    ...Typography.headerText,
    lineHeight: 40,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  trophy: {
    borderRadius: 70 / 2,
    height: 70,
    width: 70,
    backgroundColor: Colors.blue,
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
  },
  card: {
    backgroundColor: Colors.gray900,
    height: 100,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
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
