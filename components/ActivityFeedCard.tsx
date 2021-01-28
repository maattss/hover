import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { ActivityFeedData } from '../types/feedTypes';
import { GeoFenceCategory } from '../types/geoFenceTypes';

interface ActivityFeedCardProps {
  activity: ActivityFeedData;
}
const getCategoryIconName = (category: GeoFenceCategory) => {
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

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = (props: ActivityFeedCardProps) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: props.activity.picture }} style={styles.avatar} />
      <Text style={{ ...Typography.largeBodyText }}>Feed card</Text>
      <Text style={{ ...Typography.largeBodyText }}>{props.activity.name}</Text>
      <Text style={{ ...Typography.largeBodyText }}>{props.activity.caption}</Text>
      <Text style={{ ...Typography.largeBodyText }}>{props.activity.score}</Text>
      <FAIcon style={styles.categoryIcon} name={getCategoryIconName(props.activity.geoFence.category)} />
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
