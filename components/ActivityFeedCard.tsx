import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { ActivityFeedData } from '../types/feedTypes';

interface ActivityFeedCardProps {
  activity: ActivityFeedData;
}

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = (props: ActivityFeedCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: props.activity.picture }} style={styles.avatar} />
      <Text style={{ ...Typography.largeBodyText }}>Feed card</Text>
      <Text style={{ ...Typography.largeBodyText }}>{props.activity.name}</Text>
      <FAIcon style={styles.categoryIcon} name={'graduation-cap'} />
      <FAIcon style={styles.categoryIcon} name={'dumbbell'} />
      <FAIcon style={styles.categoryIcon} name={'users'} />
      <FAIcon style={styles.categoryIcon} name={'theater-masks'} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    height: 150,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  categoryIcon: {},
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
});

export default ActivityFeedCard;
