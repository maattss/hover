import React from 'react';
import { StyleSheet, Text, View, ViewStyle, Image } from 'react-native';
import { Colors, Spacing } from '../../theme';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { FeedActivityFragmentFragment } from '../../graphql/Fragments.generated';
import { convertToGeoFence } from '../../helpers/objectMappers';
import GeoFences from '../map/GeoFences';

interface ActivityFeedCardProps {
  activity: FeedActivityFragmentFragment;
}

const ProfileActivityCard: React.FC<ActivityFeedCardProps> = ({ activity }: ActivityFeedCardProps) => {
  const mapRegion: Region = {
    latitude: activity.geofence.latitude,
    longitude: activity.geofence.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const markerCoordinate: LatLng = {
    latitude: activity.geofence.latitude,
    longitude: activity.geofence.longitude,
  };
  const activityGeoFence = convertToGeoFence(activity.geofence);
  const getTopBarDisplay = () => {
    if (!activity.caption || activity.caption === '') return { display: 'none' } as ViewStyle;
    return { display: 'flex' } as ViewStyle;
  };
  return (
    <View style={styles.card}>
      <View style={[styles.topBar, getTopBarDisplay()]}>
        <Text style={styles.captionText}>{activity.caption}</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.category}>
          <Image
            source={{
              uri: getGeoFenceImage(GeoFenceCategory[activity.geofence.category as keyof typeof GeoFenceCategory]),
            }}
            style={styles.categoryIcon}
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
            title={activity.geofence.name ?? 'No name'}
            description={activity.geofence.description ? activity.geofence.description : 'No description'}
          />
          {activityGeoFence && <GeoFences geofences={[activityGeoFence]} />}
        </MapView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(activity.started_at)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginBottom: Spacing.smaller,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: Spacing.smaller,
  },
  captionText: {
    color: Colors.almostWhite,
    fontSize: 16,
    fontWeight: 'bold',
  },
  scoreText: {
    color: Colors.almostWhite,
    fontSize: 24,
    textAlign: 'center',
  },
  main: {
    marginBottom: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    width: '30%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    paddingRight: Spacing.base,
    alignItems: 'center',
  },
  categoryIcon: {
    width: 65,
    height: 65,
    marginVertical: Spacing.smallest,
  },
  map: {
    width: '70%',
    height: 120,
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
});

export default ProfileActivityCard;
