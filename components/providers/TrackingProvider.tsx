import React, { useState, ReactNode, useEffect } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert, AppState } from 'react-native';
import { durationToTimestamp } from '../../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio, insideGeoFences } from '../../helpers/geoFenceCalculations';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { LatLng } from 'react-native-maps';
import { Activities_Insert_Input } from '../../types/types';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../../tasks/locationBackgroundtasks';
import {
  clearTrackingStorage,
  PauseEvent,
  readLocationEvents,
  readPauseEvents,
  storeGeofence,
  storePauseEvents,
  storeTrackingStart,
} from '../../helpers/storage';
import { console, Date, Math } from '@ungap/global-this';
import { useInterval } from '../../hooks/useInterval';
import { getOutsideDuration, getPausedDuration } from '../../helpers/trackingCalculations';

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
  updateDoubleScore: () => console.error('Function not initialized'),
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

  // Tracking state
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
  useEffect(() => {
    if (geoFenceData) setGeoFences(convertToGeoFences(geoFenceData));
    if (geoFenceFetchError) console.error(geoFenceFetchError.message);
  }, [geoFenceData, geoFenceFetchError]);

  const getUpdatedInfo = async () => {
    const currentScore = await getScore();
    const currentDuration = await getDuration();
    setScore(currentScore);
    setDuration(currentDuration);
  };

  // Update info every second when app is active and tracking
  const shouldUpdateInfo = () => {
    //AppState.currentState == 'active' &&
    if (trackingState === TrackingState.TRACKING) return true;
    return false;
  };
  useInterval(() => getUpdatedInfo(), shouldUpdateInfo() ? 1000 : null);

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

    // TODO: Update based on async storage state
    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);
    setTrackingStart(Date.now());
    await clearTrackingStorage();
    await storeGeofence(currentGeoFence);
    await storeTrackingStart(Date.now());
    setTrackingGeofence(currentGeoFence);
    startBackgroundUpdate();
  };

  const stopTracking = async (caption: string) => {
    const publishScore = score < 0 ? 0 : Math.floor(score);
    const activity: Activities_Insert_Input = {
      caption: caption,
      geofence_id: trackingGeoFence?.id,
      user_id: userId,
      score: publishScore,
      started_at: trackingStart ? new Date(trackingStart).toISOString() : new Date().toISOString(),
      duration: durationToTimestamp(await getDuration()),
    };
    if (friendId) activity.friend_id = friendId;

    try {
      const response = await InsertActivity({
        variables: {
          activity: activity,
        },
      });
      setTrackingState(TrackingState.EXPLORE);
      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!');
    } catch (error) {
      Alert.alert('Upload error', error.message);
      console.error('Mutation error', error.message);
    }
  };

  const autoResumeTracking = async () => {
    setTrackingEnd(undefined);
    setTrackingState(TrackingState.TRACKING);
  };
  const autoPauseTracking = async () => {
    setTrackingEnd(Date.now());
    setTrackingState(TrackingState.TRACKINGPAUSED);
  };

  const resumeTracking = async () => {
    const pauseEvents = await readPauseEvents();
    const newEvent: PauseEvent = {
      timestamp: Date.now(),
      paused: false,
    };
    await storePauseEvents([...pauseEvents, newEvent]);
    setTrackingEnd(undefined);
    startBackgroundUpdate();
    setTrackingState(TrackingState.TRACKING);
  };
  const pauseTracking = async () => {
    const pauseEvents = await readPauseEvents();
    const newEvent: PauseEvent = {
      timestamp: Date.now(),
      paused: true,
    };
    await storePauseEvents([...pauseEvents, newEvent]);
    setTrackingEnd(Date.now());
    stopBackgroundUpdate();
    setTrackingState(TrackingState.PUBLISH);
  };
  const discardActivity = () => {
    setTrackingState(TrackingState.EXPLORE);
  };

  const getDuration = async () => {
    if (!trackingGeoFence || !trackingStart) return 0;
    let duration = trackingEnd ? trackingEnd - trackingStart : Date.now() - trackingStart;

    const locations = await readLocationEvents();
    let alwaysInsideGeofence = true;
    for (const location of locations) {
      if (location.insideGeofence === false) {
        alwaysInsideGeofence = false;
        break;
      }
    }
    if (!alwaysInsideGeofence) duration -= getOutsideDuration(locations);

    const pauseEvents = await readPauseEvents();
    if (pauseEvents.length > 1) duration -= getPausedDuration(pauseEvents);
    return Math.floor(duration / 1000);
  };

  const getScore = async () => {
    if (!trackingGeoFence) return 0;

    const duration = await getDuration();
    const scoreRatio = getGeoFenceScoreRatio(trackingGeoFence.category);
    const score = duration * scoreRatio;

    if (friendId !== '') return score * 2;
    console.log('Updating score', score);
    return score;
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
