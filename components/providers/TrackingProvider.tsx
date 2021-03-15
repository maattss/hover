import React, { useState, ReactNode, useEffect } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTime } from '../../helpers/dateTimeHelpers';
import { insideGeoFences } from '../../helpers/geoFenceCalculations';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { LatLng } from 'react-native-maps';
import { Activities_Insert_Input } from '../../types/types';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../../tasks/locationBackgroundTasks';
import {
  clearTrackingStorage,
  clearPreviousOutsidePushStorage,
  PauseEvent,
  readLocationEvents,
  readPauseEvents,
  readTrackingInfo,
  storePauseEvents,
  storeTrackingInfo,
  TrackingInfo,
  storeGeoFences,
} from '../../helpers/storage';
import { useInterval } from '../../hooks/useInterval';
import { getDuration, getScore } from '../../helpers/trackingCalculations';
import * as Location from 'expo-location';

export enum TrackingState {
  EXPLORE,
  TRACKING,
  TRACKINGPAUSED,
  PUBLISH,
}

interface Props {
  children: ReactNode;
}

interface TrackingContextValues {
  locationPermission: PermissionResponse | undefined;
  askPermission: () => void;
  loadingUserLocation: boolean;
  userLocation: LocationObject | undefined;
  updateUserLocation: (location: LatLng) => void;
  geoFences: GeoFence[];
  refetchGeoFences: () => void;
  trackingGeoFence: GeoFence | undefined;
  currentGeoFence: GeoFence | undefined;
  trackingState: TrackingState;
  trackingStart: number | undefined;
  trackingEnd: number | undefined;
  friendId: string | undefined;
  trackingWithFriendId: number | undefined;
  updateFriend: (friendId: string, trackingWithFriendId: number) => Promise<void>;
  startTracking: () => void;
  resumeTracking: () => void;
  pauseTracking: () => void;
  stopTracking: (caption: string) => void;
  discardActivity: () => void;
  score: number;
  duration: number;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  locationPermission: undefined,
  askPermission: () => console.error('Function not initialized'),
  loadingUserLocation: true,
  userLocation: undefined,
  updateUserLocation: () => console.error('Function not initialized'),
  geoFences: [],
  refetchGeoFences: () => console.error('Function not initialized'),
  trackingGeoFence: undefined,
  currentGeoFence: undefined,
  trackingState: TrackingState.EXPLORE,
  trackingStart: undefined,
  trackingEnd: undefined,
  friendId: undefined,
  trackingWithFriendId: undefined,
  updateFriend: () => new Promise(() => console.error('Function not initialized')),
  startTracking: () => console.error('Function not initialized'),
  resumeTracking: () => console.error('Function not initialized'),
  pauseTracking: () => console.error('Function not initialized'),
  stopTracking: () => console.error('Function not initialized'),
  discardActivity: () => console.error('Function not initialized'),
  score: 0,
  duration: 0,
});

TrackingContext.displayName = 'TrackingContext';

export const TrackingProvider = ({ children }: Props) => {
  // Tracking provider state
  const userId = useAuthentication().user?.uid ?? '';
  const [locationPermission, askPermission] = usePermissions(LOCATION);
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationObject>();
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [currentGeoFence, setCurrentGeofence] = useState<GeoFence>();

  // Tracking info state
  const [trackingGeoFence, setTrackingGeofence] = useState<GeoFence>();
  const [trackingState, setTrackingState] = useState<TrackingState>(TrackingState.EXPLORE);
  const [trackingStart, setTrackingStart] = useState<number>();
  const [trackingEnd, setTrackingEnd] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [friendId, setFriendId] = useState('');
  const [trackingWithfriendId, setTrackingWithfriendId] = useState(0);

  const [InsertActivity] = useInsertActivityMutation();
  const { data: geoFenceData, error: geoFenceFetchError, refetch } = useGeofencesQuery({
    nextFetchPolicy: 'network-only',
  });

  const updateLocalState = (trackingInfo: TrackingInfo) => {
    setTrackingEnd(trackingInfo.endTimestamp);
    setTrackingStart(trackingInfo.startTimestamp);
    setTrackingGeofence(trackingInfo.geoFence);
    setScore(trackingInfo.score);
    setDuration(trackingInfo.duration);
    setFriendId(trackingInfo.friendId ?? '');
    setTrackingWithfriendId(trackingInfo.trackingWithFriendId ?? 0);
  };

  const resetTrackingState = async () => {
    setTrackingEnd(undefined);
    setTrackingStart(Date.now());
    setTrackingGeofence(currentGeoFence);
    setScore(0);
    setDuration(0);
    setFriendId('');
    setTrackingWithfriendId(0);

    await storeTrackingInfo({
      geoFence: currentGeoFence,
      friendId: '',
      trackingWithFriendId: 0,
      duration: 0,
      score: 0,
      startTimestamp: Date.now(),
      endTimestamp: 0,
      updatedAtTimestamp: Date.now(),
    } as TrackingInfo);
  };

  useEffect(() => {
    // Restore tracking on initial render if application chrashed
    const restore = async () => {
      const trackingInfo = await readTrackingInfo();

      if (trackingInfo) {
        if (trackingInfo.friendId !== '' && trackingInfo.trackingWithFriendId !== 0) {
          console.log('Restoring Hover with friends session...');
          setFriendId(trackingInfo.friendId);
          setTrackingWithfriendId(trackingInfo.trackingWithFriendId);
        }

        console.log('Restoring tracking session...');
        const pauseEvents = await readPauseEvents();
        if (pauseEvents.length > 0 && pauseEvents[pauseEvents.length - 1].paused === true) {
          console.log('User on publish screen when app chrashed');
          setTrackingState(TrackingState.PUBLISH);
          updateLocalState(trackingInfo);
          return;
        }

        const trackingLocations = await readLocationEvents();
        if (trackingLocations.length > 0 && trackingLocations[trackingLocations.length - 1].insideGeofence === false) {
          console.log('User outside geofence when app chrased. Tracking auto paused.');
          setTrackingState(TrackingState.TRACKINGPAUSED);
          updateLocalState(trackingInfo);
          return;
        }

        console.log('User inside geofence when app chrased. Tracking active.');
        // Add pause window if app chrashed more than 30 minutes ago
        const moreThanThirtyMinutesAgo = trackingInfo.updatedAtTimestamp < Date.now() - 30 * 60;
        if (moreThanThirtyMinutesAgo) {
          const startEvent: PauseEvent = {
            timestamp: trackingInfo.updatedAtTimestamp,
            paused: true,
          };
          const endEvent: PauseEvent = {
            timestamp: Date.now(),
            paused: false,
          };
          await storePauseEvents([...pauseEvents, startEvent, endEvent]);
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        const insideGeoFence = insideGeoFences(currentLocation, [trackingInfo.geoFence]);
        if (insideGeoFence) {
          setTrackingState(TrackingState.TRACKING);
          setTrackingEnd(undefined);
          setTrackingStart(trackingInfo.startTimestamp);
          setTrackingGeofence(trackingInfo.geoFence);
          setScore(trackingInfo.score);
          setDuration(trackingInfo.duration);
          setFriendId(trackingInfo.friendId ?? '');
          setTrackingWithfriendId(trackingInfo.trackingWithFriendId ?? 0);
          startBackgroundUpdate();
        }
      }
    };
    restore();
  }, []);

  useEffect(() => {
    const store = async (newGeofences: GeoFence[]) => await storeGeoFences(newGeofences);
    if (geoFenceData) {
      const newGeofences = convertToGeoFences(geoFenceData);
      setGeoFences(newGeofences);
      store(newGeofences);
    }
    if (geoFenceFetchError) console.error(geoFenceFetchError.message);
  }, [geoFenceData, geoFenceFetchError]);

  const updateScoreAndDuration = async () => {
    const trackingInfo = await readTrackingInfo();
    const updatedDuration = await getDuration(trackingInfo);
    const updatedScore = getScore(updatedDuration, trackingInfo.geoFence.category, trackingInfo.friendId ?? '');
    storeTrackingInfo({
      geoFence: trackingInfo.geoFence,
      duration: updatedDuration,
      score: updatedScore,
      startTimestamp: trackingInfo.startTimestamp,
      endTimestamp: trackingInfo.endTimestamp,
      updatedAtTimestamp: Date.now(),
      friendId: trackingInfo.friendId ?? '',
      trackingWithFriendId: trackingInfo.trackingWithFriendId ?? 0,
    });
    setDuration(updatedDuration);
    setScore(updatedScore);
  };

  useInterval(() => updateScoreAndDuration(), trackingState === TrackingState.TRACKING ? 2000 : null);

  const externalUpdateUserLocation = (newUserLocation: LatLng) => {
    const locationObject = {
      coords: {
        latitude: newUserLocation.latitude ?? 0,
        longitude: newUserLocation.longitude ?? 0,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    };
    updateUserLocation(locationObject);
  };

  const updateUserLocation = (newUserLocation: LocationObject) => {
    setUserLocation(newUserLocation);
    const insideGeoFence = insideGeoFences(newUserLocation, geoFences);

    if (loadingUserLocation) setLoadingUserLocation(false);

    if (insideGeoFence) {
      setCurrentGeofence(insideGeoFence);
      if (trackingState === TrackingState.TRACKINGPAUSED && insideGeoFence.id === trackingGeoFence?.id)
        autoResumeTracking();
    }

    if (!insideGeoFence) {
      setCurrentGeofence(undefined);
      if (trackingState === TrackingState.TRACKING) autoPauseTracking();
    }
  };

  const startTracking = async () => {
    if (!locationPermission || locationPermission.status !== 'granted') {
      Alert.alert(
        'Location permission not accepted',
        'Location permission is required to start tracking. Please update your device settings.',
      );
      return;
    }

    if (!currentGeoFence) {
      Alert.alert(
        'Not inside a Hover zone',
        "Sorry, you can't start tracking here! Move to a Hover zone to start earning points.",
      );
      return;
    }

    await clearTrackingStorage();
    await clearPreviousOutsidePushStorage();
    await resetTrackingState();
    startBackgroundUpdate();
    setTrackingState(TrackingState.TRACKING);
  };

  const stopTracking = async (caption: string) => {
    const trackingInfo = await readTrackingInfo();
    const publishScore = trackingInfo.score < 0 ? 0 : Math.floor(trackingInfo.score);
    const activity: Activities_Insert_Input = {
      caption: caption,
      geofence_id: trackingInfo.geoFence.id,
      user_id: userId,
      score: publishScore,
      started_at: new Date(trackingInfo.startTimestamp).toISOString(),
      duration: durationToTime(trackingInfo.duration),
    };
    if (trackingInfo.friendId !== '') activity.friend_id = friendId;

    try {
      const response = await InsertActivity({
        variables: {
          activity: activity,
        },
      });

      setTrackingState(TrackingState.EXPLORE);
      await clearTrackingStorage();
      await clearPreviousOutsidePushStorage();
      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload error', error.message);
      console.error('Mutation error', error.message);
    }
  };
  const storeNewEndTimestamp = async (endTimestamp: number) => {
    const trackingInfo = await readTrackingInfo();
    await storeTrackingInfo({
      geoFence: trackingInfo.geoFence,
      friendId: trackingInfo.friendId ?? '',
      trackingWithFriendId: trackingInfo.trackingWithFriendId ?? 0,
      duration: trackingInfo.duration,
      score: trackingInfo.score,
      startTimestamp: trackingInfo.startTimestamp,
      endTimestamp: endTimestamp,
      updatedAtTimestamp: trackingInfo.updatedAtTimestamp,
    } as TrackingInfo);
  };

  const autoResumeTracking = async () => {
    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);
    await storeNewEndTimestamp(0);
  };
  const autoPauseTracking = async () => {
    setTrackingState(TrackingState.TRACKINGPAUSED);
    setTrackingEnd(Date.now());
    await storeNewEndTimestamp(Date.now());
  };

  const resumeTracking = async () => {
    const pauseEvents = await readPauseEvents();
    const newEvent: PauseEvent = {
      timestamp: Date.now(),
      paused: false,
    };
    await storePauseEvents([...pauseEvents, newEvent]);

    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);
    await storeNewEndTimestamp(0);
    startBackgroundUpdate();
  };
  const pauseTracking = async () => {
    const pauseEvents = await readPauseEvents();
    const newEvent: PauseEvent = {
      timestamp: Date.now(),
      paused: true,
    };
    await storePauseEvents([...pauseEvents, newEvent]);

    setTrackingState(TrackingState.PUBLISH);
    setTrackingEnd(Date.now());
    await storeNewEndTimestamp(Date.now());
    stopBackgroundUpdate();
  };

  const discardActivity = async () => {
    setTrackingState(TrackingState.EXPLORE);
    await clearTrackingStorage();
    await clearPreviousOutsidePushStorage();
  };
  const updateFriend = async (newFriendId: string, newTrackingWithFriendId: number) => {
    setFriendId(newFriendId);
    setTrackingWithfriendId(newTrackingWithFriendId);

    const trackingInfo = await readTrackingInfo();
    await storeTrackingInfo({
      geoFence: trackingInfo.geoFence,
      duration: trackingInfo.duration,
      score: trackingInfo.score,
      startTimestamp: trackingInfo.startTimestamp,
      endTimestamp: trackingInfo.endTimestamp,
      friendId: newFriendId,
      trackingWithFriendId: newTrackingWithFriendId,
      updatedAtTimestamp: trackingInfo.updatedAtTimestamp,
    } as TrackingInfo);
  };

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
    askPermission: askPermission,
    loadingUserLocation: loadingUserLocation,
    userLocation: userLocation,
    updateUserLocation: externalUpdateUserLocation,
    geoFences: geoFences,
    refetchGeoFences: refetch,
    currentGeoFence: currentGeoFence,
    trackingGeoFence: trackingGeoFence,
    trackingState: trackingState,
    trackingStart: trackingStart,
    trackingEnd: trackingEnd,
    startTracking: startTracking,
    resumeTracking: resumeTracking,
    pauseTracking: pauseTracking,
    stopTracking: stopTracking,
    discardActivity: discardActivity,
    friendId: friendId,
    trackingWithFriendId: trackingWithfriendId,
    updateFriend: updateFriend,
    score: score,
    duration: duration,
  };
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
