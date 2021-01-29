import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { ActivityFeedData } from '../../types/feedTypes';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import Divider from '../Divider';

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
const getColor = (category: GeoFenceCategory) => {
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

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = ({ activity }: ActivityFeedCardProps) => {
  const categoryColor = {
    color: getColor(activity.geoFence.category),
  };
  const mapRegion: Region = {
    latitude: activity.geoFence.latitude,
    longitude: activity.geoFence.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const markerCoordinate: LatLng = {
    latitude: activity.geoFence.latitude,
    longitude: activity.geoFence.longitude,
  };
  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Image source={{ uri: activity.picture }} style={styles.avatar} />
        <View>
          <Text style={styles.nameText}>{activity.userName}</Text>
          <Text style={styles.captionText}>{activity.caption}</Text>
        </View>
      </View>
      <View style={styles.main}>
        <View style={styles.category}>
          <FAIcon style={[styles.categoryIcon, categoryColor]} name={getCategoryIconName(activity.geoFence.category)} />
          <Text style={styles.scoreText}>{activity.score} points</Text>
        </View>
        <MapView style={styles.map} initialRegion={mapRegion}>
          <Marker
            coordinate={markerCoordinate}
            title={activity.geoFence.name}
            description={activity.geoFence.description}
          />
        </MapView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(activity.startedAt)}</Text>
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
    fontSize: 20,
    lineHeight: 30,
  },
  captionText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
  },
  main: {
    marginVertical: Spacing.small,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    width: '30%',
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: Spacing.base,
  },
  map: {
    width: '70%',
    height: 110,
    borderRadius: Spacing.smallest,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
  card: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
  scoreText: {
    color: Colors.almostWhite,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ActivityFeedCard;
