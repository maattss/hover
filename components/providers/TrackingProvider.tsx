import React, { useState, ReactNode, useEffect } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert, AppState } from 'react-native';
import { durationToTime } from '../../helpers/dateTimeHelpers';
import { insideGeoFences } from '../../helpers/geoFenceCalculations';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { LatLng } from 'react-native-maps';
import { Activities_Insert_Input } from '../../types/types';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../../tasks/locationBackgroundtasks';
import {
  clearTrackingStorage,
  PauseEvent,
  readPauseEvents,
  readTrackingInfo,
  storePauseEvents,
  storeTrackingInfo,
  TrackingInfo,
} from '../../helpers/storage';
import { console, Date, Math } from '@ungap/global-this';
import { useInterval } from '../../hooks/useInterval';

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
  setFriendId: React.Dispatch<React.SetStateAction<string>>;
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
  setFriendId: () => console.error('Function not initialized'),
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
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
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

  const [InsertActivity] = useInsertActivityMutation();
  const { data: geoFenceData, error: geoFenceFetchError, refetch } = useGeofencesQuery({
    nextFetchPolicy: 'network-only',
  });

  // Restore tracking if application has chrashed
  useEffect(() => {
    async () => {
      stopBackgroundUpdate();
      const trackingInfo = await readTrackingInfo();
      if (trackingInfo) {
        setTrackingState(TrackingState.TRACKING);
        setTrackingEnd(undefined);
        setTrackingStart(trackingInfo.startTimestamp);
        setTrackingGeofence(trackingInfo.geoFence);
        setScore(trackingInfo.score);
        setDuration(trackingInfo.duration);
        setFriendId(trackingInfo.friendId);
        startBackgroundUpdate();
      }
    };
  }, []);

  useEffect(() => {
    if (geoFenceData) setGeoFences(convertToGeoFences(geoFenceData));
    if (geoFenceFetchError) console.error(geoFenceFetchError.message);
  }, [geoFenceData, geoFenceFetchError]);

  const getUpdatedInfo = async () => {
    const updatedInfo = await readTrackingInfo();
    setDuration(updatedInfo.duration);
    setScore(updatedInfo.score);
  };

  // Update info every second when app is active and tracking
  const shouldUpdateInfo = () => {
    if (trackingState === TrackingState.TRACKING) return true;
    return false;
  };
  useInterval(() => getUpdatedInfo(), shouldUpdateInfo() ? 1000 : null);

  // TODO: Update only when application is active?
  // AppState.currentState === 'active'

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

    // Reset tracking state
    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);
    setTrackingStart(Date.now());
    setTrackingGeofence(currentGeoFence);
    setScore(0);
    setDuration(0);
    setFriendId('');

    // Store tracking state
    await storeTrackingInfo({
      geoFence: currentGeoFence,
      friendId: '',
      duration: 0,
      score: 0,
      startTimestamp: Date.now(),
      endTimestamp: 0,
      state: trackingState,
    } as TrackingInfo);
    startBackgroundUpdate();
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
      stopBackgroundUpdate();
      await clearTrackingStorage();
      setTrackingState(TrackingState.EXPLORE);
      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload error', error.message);
      console.error('Mutation error', error.message);
    }
  };

  const autoResumeTracking = async () => {
    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);

    const trackingInfo = await readTrackingInfo();
    trackingInfo.endTimestamp = 0;
    storeTrackingInfo(trackingInfo);
  };
  const autoPauseTracking = async () => {
    setTrackingState(TrackingState.TRACKINGPAUSED);
    setTrackingEnd(Date.now());
    const trackingInfo = await readTrackingInfo();
    trackingInfo.endTimestamp = Date.now();
    storeTrackingInfo(trackingInfo);
  };

  const resumeTracking = async () => {
    const pauseEvents = await readPauseEvents();
    const newEvent: PauseEvent = {
      timestamp: Date.now(),
      paused: false,
    };
    await storePauseEvents([...pauseEvents, newEvent]);

    startBackgroundUpdate();
    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);

    const trackingInfo = await readTrackingInfo();
    trackingInfo.endTimestamp = 0;
    storeTrackingInfo(trackingInfo);
  };
  const pauseTracking = async () => {
    const pauseEvents = await readPauseEvents();
    const newEvent: PauseEvent = {
      timestamp: Date.now(),
      paused: true,
    };
    await storePauseEvents([...pauseEvents, newEvent]);
    stopBackgroundUpdate();
    setTrackingState(TrackingState.PUBLISH);
    setTrackingEnd(Date.now());

    const trackingInfo = await readTrackingInfo();
    trackingInfo.endTimestamp = Date.now();
    storeTrackingInfo(trackingInfo);
  };

  const discardActivity = async () => {
    await clearTrackingStorage();
    setTrackingState(TrackingState.EXPLORE);
  };

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
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
    setFriendId: setFriendId,
    score: score,
    duration: duration,
  };
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
