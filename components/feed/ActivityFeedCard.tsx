import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { ActivityFeedData } from '../../types/feedTypes';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { defaultMapLocation } from '../../helpers/objectMappers';

interface ActivityFeedCardProps {
  activity: ActivityFeedData;
}

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
export const getCategoryColor = (category: GeoFenceCategory | undefined) => {
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
    color: getCategoryColor(activity.geoFence ? activity.geoFence.category : undefined),
  };
  const mapRegion: Region = {
    latitude: activity.geoFence ? activity.geoFence.latitude : defaultMapLocation.latitude,
    longitude: activity.geoFence ? activity.geoFence.longitude : defaultMapLocation.latitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const markerCoordinate: LatLng = {
    latitude: activity.geoFence ? activity.geoFence.latitude : defaultMapLocation.latitude,
    longitude: activity.geoFence ? activity.geoFence.longitude : defaultMapLocation.latitude,
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
          <FAIcon
            style={[styles.categoryIcon, categoryColor]}
            name={getCategoryIconName(activity.geoFence ? activity.geoFence.category : undefined)}
          />
          <Text style={styles.scoreText}>{activity.score} points</Text>
        </View>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}>
          <Marker
            coordinate={markerCoordinate}
            title={activity.geoFence ? activity.geoFence.name : 'No name'}
            description={activity.geoFence ? activity.geoFence.description : 'No description'}
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
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
  },
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
    flexWrap: 'wrap',
  },
  scoreText: {
    color: Colors.almostWhite,
    fontSize: 24,
    textAlign: 'center',
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
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
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
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
});

export default ActivityFeedCard;
