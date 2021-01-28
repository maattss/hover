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
      <View style={styles.topBar}>
        <Text style={{ ...Typography.largeBodyText }}>{props.activity.name}</Text>
        <Image source={{ uri: props.activity.picture }} style={styles.avatar} />
        <Text style={{ ...Typography.largeBodyText }}>{props.activity.caption}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.category}>
          <FAIcon style={styles.categoryIcon} name={getCategoryIconName(props.activity.geoFence.category)} />
          <Text style={{ ...Typography.largeBodyText }}>{props.activity.score}</Text>
        </View>
        <View style={styles.map}></View>
      </View>
      <View style={styles.footer}>
        <Text style={{ ...Typography.largeBodyText }}>{props.activity.startedAt}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {},
  main: {},
  category: {},
  map: {},
  footer: {},
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
