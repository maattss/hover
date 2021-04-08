import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { ActivityFeedData } from '../../types/feedTypes';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import GeoFences from '../map/GeoFences';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import { convertToGeoFence, defaultUserProfile } from '../../helpers/objectMappers';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import TouchableProfile from '../general/TouchableProfile';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import useAuthentication from '../../hooks/useAuthentication';
import Reaction from './Reaction';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Divider from '../general/Divider';
import * as Analytics from 'expo-firebase-analytics';

interface ActivityFeedCardProps {
  data: ActivityFeedData;
}

const ActivityFeedCard: React.FC<ActivityFeedCardProps> = ({ data }: ActivityFeedCardProps) => {
  const auth = useAuthentication();
  const activityGeoFence = convertToGeoFence(data.activity.geofence);
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

  const getName = () => {
    if (auth.user?.uid === data.user.id) return 'Your activity';
    return data.user.name;
  };
  const showInfoPopup = () =>
    Alert.alert(
      'Hover together with a friend and earn 2x points!',
      `${data.user.name} hovered together with ${
        data.activity.friend?.name ?? defaultUserProfile.name
      } and got double points! You can also do this by using 
      'Start session' or 'Join friend' while tracking.`,
    );

  return (
    <View style={styles.card}>
      <TouchableProfile
        user_id={data.user.id}
        name={data.user.name}
        onPress={() =>
          Analytics.logEvent('visit_profile', {
            navigateFrom: 'FeedScreen',
            user: data.user.id,
            navigateTo: 'ProfileScreen',
            purpose: 'Viewing more info on a user',
          })
        }>
        <View style={styles.flexRowLeft}>
          <View style={styles.topBar}>
            <Avatar
              rounded
              source={{
                uri: data.user.picture && data.user.picture !== '' ? data.user.picture : defaultUserProfile.picture,
              }}
              size={'medium'}
            />
            <View style={{ marginLeft: Spacing.smaller }}>
              <Text style={styles.nameText}>{getName()}</Text>
              <Text style={styles.timeText}>{timeStampToPresentable(data.createdAt)}</Text>
            </View>
          </View>
        </View>
      </TouchableProfile>

      {data.activity.caption !== '' && (
        <View style={styles.captionCard}>
          <Text style={styles.captionText} numberOfLines={4}>
            {data.activity.caption}
          </Text>
        </View>
      )}
      <View style={styles.innerCard}>
        <View style={[{ paddingTop: Spacing.smaller }, data.activity.friend ? { width: '55%' } : {}]}>
          <View style={[styles.flexRowLeft, { marginBottom: Spacing.smaller }]}>
            <FAIcon name={'stopwatch'} style={styles.infoIcons} />
            <Text style={styles.label}>{data.activity.duration}</Text>
          </View>
          <View style={[styles.flexRowLeft, { marginBottom: Spacing.smaller }]}>
            <FAIcon name={'map-marker-alt'} style={styles.infoIcons} />
            <Text style={styles.label}>{data.activity.geofence.name}</Text>
          </View>
        </View>
        {data.activity.friend && (
          <TouchableOpacity style={styles.collab} onPress={showInfoPopup}>
            <View>
              <View style={styles.flexRowSpaceBetween}>
                <Text style={styles.collabIconText}>2x points with</Text>
                <FAIcon name={'info-circle'} style={styles.collabInfoIcon} />
              </View>

              <View style={[styles.flexRowLeft, { paddingTop: Spacing.smallest }]}>
                <Image
                  style={styles.miniAvatar}
                  source={{
                    uri:
                      data.activity.friend.picture && data.activity.friend.picture !== ''
                        ? data.activity.friend.picture
                        : defaultUserProfile.picture,
                  }}
                />
                <Text style={styles.friendName} numberOfLines={1}>
                  {data.activity.friend?.name}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
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
          region={mapRegion}
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
      <Divider style={{ borderColor: Colors.gray800, marginTop: Spacing.smaller }} />
      <Reaction feed_id={data.id} user_id={auth.user?.uid ?? ''} likes={data.likes} />
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
  timeText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
    flexWrap: 'wrap',
  },
  captionCard: {
    marginVertical: Spacing.smallest,
    marginHorizontal: Spacing.smaller,
  },
  captionText: {
    ...Typography.bodyText,
    flexWrap: 'wrap',
  },
  scoreText: {
    color: Colors.almostWhite,
    fontSize: 24,
    textAlign: 'center',
  },
  main: {
    marginVertical: Spacing.smallest,
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
  miniAvatar: {
    height: 20,
    width: 20,
    borderRadius: 20 / 2,
    marginRight: Spacing.smallest,
  },
  infoIcons: {
    ...Typography.smallIcon,
    marginRight: Spacing.smaller,
    width: 26,
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
  collab: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
    width: '45%',
  },
  collabInfoIcon: {
    fontSize: 14,
    color: Colors.gold,
    marginLeft: Spacing.smallest,
  },
  collabIconText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  friendName: {
    ...Typography.bodyText,
    fontSize: 12,
    flexWrap: 'wrap',
    marginRight: Spacing.large,
  },
});

export default ActivityFeedCard;
