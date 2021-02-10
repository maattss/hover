import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { ActivityFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { defaultMapLocation } from '../../helpers/objectMappers';
import GeoFences from '../map/GeoFences';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';

interface ActivityFeedCardProps {
  activity: ActivityFeedData;
}

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = ({ activity }: ActivityFeedCardProps) => {
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
          <Image source={{ uri: getGeoFenceImage(activity.geoFence?.category) }} style={styles.categoryIcon} />
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
          <GeoFences geofences={activity.geoFence ? [activity.geoFence] : undefined} />
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
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingRight: Spacing.base,
  },
  categoryIcon: {
    height: 50,
    width: 50,
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
