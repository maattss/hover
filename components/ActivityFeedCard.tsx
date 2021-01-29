import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { ActivityFeedData } from '../types/feedTypes';
import { GeoFenceCategory } from '../types/geoFenceTypes';
import { timeStampToPresentable } from '../helpers/dateTimeHelpers';

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
        <Image source={{ uri: props.activity.picture }} style={styles.avatar} />
        <Text style={styles.nameText}>{props.activity.userName}</Text>

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
        <Text style={{ ...Typography.largeBodyText }}>{timeStampToPresentable(props.activity.startedAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameText: {
    ...Typography.headerText,
    lineHeight: 60,
  },
  main: {},
  category: {},
  map: {},
  footer: {},
  card: {
    backgroundColor: Colors.gray900,
    height: 150,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  categoryIcon: {},
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    marginRight: Spacing.small,
  },
});

export default ActivityFeedCard;
