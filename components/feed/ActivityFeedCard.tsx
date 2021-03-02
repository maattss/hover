import React, { useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { ActivityFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import GeoFences from '../map/GeoFences';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import { convertToGeoFence, defaultUserProfile } from '../../helpers/objectMappers';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import TouchableProfile from '../general/TouchableProfile';
import Divider from '../general/Divider';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import useAuthentication from '../../hooks/useAuthentication';
import { Asset } from 'expo-asset';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ActivityFeedCardProps {
  data: ActivityFeedData;
}

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = ({ data }: ActivityFeedCardProps) => {
  const auth = useAuthentication();
  const [reactionCount, setReactionCount] = useState(0);
  const [userReacted, setUserReacted] = useState(false);

  const mapRegion: Region = {
    latitude: data.activity.geofence.latitude,
    longitude: data.activity.geofence.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };
  const markerCoordinate: LatLng = {
    latitude: data.activity.geofence.latitude,
    longitude: data.activity.geofence.longitude,
  };
  const activityGeoFence = convertToGeoFence(data.activity.geofence);
  const getName = () => {
    if (auth.user?.uid === data.user.id) return 'You';
    return data.user.name;
  };
  const react = () => {
    if (!userReacted) {
      setReactionCount(reactionCount + 1);
      setUserReacted(true);
    } else {
      setReactionCount(reactionCount - 1);
      setUserReacted(false);
    }
    // TODO: Insert likes mutation here
  };
  const getReactionText = () => {
    if (reactionCount === 0) return 'No reactions yet.. Tap to be the first!';
    if (reactionCount === 1 && userReacted) return 'You reacted to this activity.';
    if (reactionCount === 1 && !userReacted) return '1 user reacted to this activity.';
    if (userReacted) return 'You and ' + (reactionCount - 1) + ' users reacted to this activity.';
    return reactionCount + ' users reacted to this activity.';
  };
  return (
    <View style={styles.card}>
      <TouchableProfile user_id={data.user.id} name={data.user.name}>
        <View style={styles.flexRowLeft}>
          <View style={styles.topBar}>
            <Avatar
              source={{ uri: data.user.picture ? data.user.picture : defaultUserProfile.picture }}
              size={'medium'}
            />
            <View style={{ marginLeft: Spacing.smaller }}>
              <Text style={styles.nameText}>{getName()}</Text>
              <Text style={styles.captionText} numberOfLines={3}>
                {data.activity.caption}
              </Text>
            </View>
          </View>
        </View>
      </TouchableProfile>
      <Divider />
      <View style={styles.innerCard}>
        <View style={data.activity.friend ? { width: '60%' } : { width: '100%' }}>
          <View style={[styles.flexRowLeft, { marginBottom: Spacing.smaller }]}>
            <FAIcon name={'map-marker-alt'} style={styles.infoIcons} />
            <Text style={styles.label}>{data.activity.geofence.name}</Text>
          </View>
          <View style={[styles.flexRowLeft, { marginBottom: Spacing.smaller }]}>
            <FAIcon name={'stopwatch'} style={styles.infoIcons} />
            <Text style={styles.label}>{data.activity.duration}</Text>
          </View>
          {data.activity.friend && (
            <TouchableProfile user_id={data.activity.friend.id} name={data.activity.friend.name}>
              <View style={styles.flexRowLeft}>
                <FAIcon name={'user-friends'} style={styles.infoIcons} />
                <Text style={styles.label}>{data.activity.friend?.name}</Text>
              </View>
            </TouchableProfile>
          )}
        </View>
        {data.activity.friend && (
          <View style={styles.collabIcon}>
            <Text style={styles.collabIconText}>2x points</Text>
          </View>
        )}
      </View>
      <View style={styles.main}>
        <View style={styles.category}>
          <Image
            source={{ uri: getGeoFenceImage(data.activity.geofence.category as GeoFenceCategory) }}
            style={styles.categoryIcon}
          />
          <Text style={styles.scoreText}>{data.activity.score} points</Text>
        </View>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          zoomEnabled={false}>
          <Marker
            coordinate={markerCoordinate}
            title={data.activity.geofence.name ?? 'No name'}
            description={data.activity.geofence.description ?? 'No description'}
          />
          {activityGeoFence && <GeoFences geofences={[activityGeoFence]} />}
        </MapView>
      </View>
      <View>
        <Text style={{ ...Typography.bodyText, marginLeft: Spacing.smaller, marginVertical: Spacing.smallest }}>
          {getReactionText()}
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity onPress={react}>
          {reactionCount === 0 ? (
            <Image
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              source={{ uri: Asset.fromModule(require('../../assets/images/clap-gray.png')).uri }}
              style={styles.reactionIcon}
            />
          ) : (
            <Image
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              source={{ uri: Asset.fromModule(require('../../assets/images/clap.png')).uri }}
              style={styles.reactionIcon}
            />
          )}
        </TouchableOpacity>
        <Text style={styles.footerText}>{timeStampToPresentable(data.createdAt)}</Text>
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
    borderRadius: Spacing.smaller,
    padding: Spacing.smallest,
    maxWidth: '80%',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 30,
    marginTop: Spacing.smallest,
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
    marginVertical: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    width: '29%',
    height: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: Spacing.smaller,
    borderRadius: Spacing.smaller,
  },
  categoryIcon: {
    height: 50,
    width: 50,
    marginVertical: Spacing.smallest,
  },
  map: {
    width: '69%',
    height: 120,
    borderRadius: Spacing.smallest,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.smaller,
    width: '100%',
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
  miniAvatar: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginRight: Spacing.small,
  },
  // New
  reactionIcon: {
    height: 25,
    width: 25,
    marginVertical: Spacing.smallest,
  },
  infoIcons: {
    ...Typography.smallIcon,
    marginRight: Spacing.smaller,
    width: 30,
    textAlign: 'center',
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
  },
  flexRowLeft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  flexRowSpaceEven: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  flexRowSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.smallest,
  },
  collabIcon: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.gray900,
    borderColor: Colors.gold,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
    width: '30%',
  },
  collabIconText: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
    color: Colors.gold,
  },
});

export default ActivityFeedCard;
