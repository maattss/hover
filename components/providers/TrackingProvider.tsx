import React, { useState, ReactNode, useEffect, useCallback } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTimestamp } from '../../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio, insideGeoFences } from '../../helpers/geoFenceCalculations';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { LatLng } from 'react-native-maps';
import { Activities_Insert_Input } from '../../types/types';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../../tasks/locationBackgroundtasks';
import {
  clearTrackingStorage,
  readTrackingLocations,
  storeGeofence,
  storeTrackingLocations,
  TrackingLocation,
} from '../../helpers/storage';
import { console, Date } from '@ungap/global-this';
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
  unUploadedActivities: Activities_Insert_Input[];
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
  doubleScore: boolean;
  updateDoubleScore: (value: boolean) => void;
  setFriendId: React.Dispatch<React.SetStateAction<string>>;
  startTracking: () => void;
  resumeTracking: () => void;
  pauseTracking: () => void;
  stopTracking: (caption: string) => void;
  discardActivity: () => void;
  getScore: () => Promise<number>;
  getDuration: () => Promise<number>;
  score: number;
  duration: number;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  unUploadedActivities: [],
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
  doubleScore: false,
  updateDoubleScore: () => console.error('Function not initialized'),
  setFriendId: () => console.error('Function not initialized'),
  startTracking: () => console.error('Function not initialized'),
  resumeTracking: () => console.error('Function not initialized'),
  pauseTracking: () => console.error('Function not initialized'),
  stopTracking: () => console.error('Function not initialized'),
  discardActivity: () => console.error('Function not initialized'),
  getScore: async () => 0, // TODO: Remove
  getDuration: async () => 0, // TODO: remove
  score: 0,
  duration: 0,
});

TrackingContext.displayName = 'TrackingContext';

export const TrackingProvider = ({ children }: Props) => {
  const userId = useAuthentication().user?.uid;
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationObject>();
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [unUploadedActivities, setUnUploadedActivities] = useState<Activities_Insert_Input[]>([]);
  const [currentGeoFence, setCurrentGeofence] = useState<GeoFence>();
  const [trackingGeoFence, setTrackingGeofence] = useState<GeoFence>();
  const [trackingState, setTrackingState] = useState<TrackingState>(TrackingState.EXPLORE);
  const [trackingStart, setTrackingStart] = useState<number>();
  const [trackingEnd, setTrackingEnd] = useState<number>();
  const [score, setScore] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [doubleScore, setDoubleScore] = useState(false);
  const [friendId, setFriendId] = useState('');

  const [InsertActivity] = useInsertActivityMutation();
  const { data: geoFenceData, error: geoFenceFetchError, refetch } = useGeofencesQuery({
    nextFetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (geoFenceData) setGeoFences(convertToGeoFences(geoFenceData));
    if (geoFenceFetchError) console.error(geoFenceFetchError.message);
  }, [geoFenceData, geoFenceFetchError]);

  const getUpdatedInfo = useCallback(async () => {
    const currentScore = await getScore();
    const currentDuration = await getDuration();
    setScore(currentScore);
    setDuration(currentDuration);
  }, [score, duration]);

  useInterval(getUpdatedInfo, trackingState === TrackingState.TRACKING ? 1000 : null);

  const getLocationObject = (latitude: number | undefined, longitude: number | undefined, timestamp: number) => ({
    coords: {
      latitude: latitude ?? 0,
      longitude: longitude ?? 0,
      altitude: null,
      accuracy: null,
      altitudeAccuracy: null,
      heading: null,
      speed: null,
    },
    timestamp: timestamp,
  });

  const externalUpdateUserLocation = (newUserLocation: LatLng) =>
    updateUserLocation(getLocationObject(newUserLocation.latitude, newUserLocation.longitude, Date.now()));

  const updateUserLocation = (newUserLocation: LocationObject) => {
    console.log('Location update [' + newUserLocation.coords.latitude + ',' + newUserLocation.coords.longitude + ']');
    setUserLocation(newUserLocation);
    const insideGeoFence = insideGeoFences(newUserLocation, geoFences);

    if (loadingUserLocation) setLoadingUserLocation(false);

    if (insideGeoFence) {
      setCurrentGeofence(insideGeoFence);
      // TODO: Update this
      if (trackingState === TrackingState.TRACKINGPAUSED && insideGeoFence.id === trackingGeoFence?.id) {
        console.log('Inside geofence! Tracking auto start');
        setTrackingState(TrackingState.TRACKING);
      }
    }

    if (!insideGeoFence) {
      setCurrentGeofence(undefined);
      // TODO: Update this
      if (trackingState === TrackingState.TRACKING) {
        console.log('Outside geofence! Tracking auto paused');
        setTrackingState(TrackingState.TRACKINGPAUSED);
      }
    }
  };

  const addUnUploadedActivity = (activity: Activities_Insert_Input) =>
    setUnUploadedActivities([...unUploadedActivities, activity]);

  const startTracking = async () => {
    if (locationPermission && locationPermission.status !== 'granted') {
      Alert.alert(
        'Location permission not accepted',
        'Location permission is required to start tracking. Please update it in settings on your device.',
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

    setTrackingState(TrackingState.TRACKING);
    setTrackingEnd(undefined);
    setTrackingStart(Date.now());
    await clearTrackingStorage();
    await storeGeofence(currentGeoFence);
    setTrackingGeofence(currentGeoFence);
    startBackgroundUpdate();
  };
  const resumeTracking = async () => {
    const locations = await readTrackingLocations();
    const location: TrackingLocation = {
      location: getLocationObject(userLocation?.coords.latitude, userLocation?.coords.longitude, Date.now()),
      insideGeofence: true,
    };
    await storeTrackingLocations([...locations, location]);
    setTrackingEnd(undefined);
    startBackgroundUpdate();
    setTrackingState(TrackingState.TRACKING);
  };
  const pauseTracking = async () => {
    const locations = await readTrackingLocations();
    const location: TrackingLocation = {
      location: getLocationObject(userLocation?.coords.latitude, userLocation?.coords.longitude, Date.now()),
      insideGeofence: false,
    };
    await storeTrackingLocations([...locations, location]);
    setTrackingEnd(Date.now());
    stopBackgroundUpdate();
    setTrackingState(TrackingState.PUBLISH);
  };
  const discardActivity = () => {
    setTrackingState(TrackingState.EXPLORE);
  };

  const stopTracking = async (caption: string) => {
    setTrackingState(TrackingState.EXPLORE);
    const activity: Activities_Insert_Input = {
      caption: caption,
      geofence_id: currentGeoFence?.id,
      user_id: userId ?? '0',
      score: await getScore(),
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
      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!');
    } catch (error) {
      console.error('Mutation error', error.message);
      addUnUploadedActivity(activity);
    }
  };
  const updateDoubleScore = (value: boolean) => setDoubleScore(value);

  const getOutsideDuration = (locations: TrackingLocation[]) => {
    let duration = 0;
    const previousEntry = {
      inside: true,
      timestamp: 0,
    };

    for (const location of locations) {
      if (previousEntry.inside === false && location.insideGeofence === true)
        duration += location.location.timestamp - previousEntry.timestamp;

      previousEntry.timestamp = location.location.timestamp;
      previousEntry.inside = location.insideGeofence;
    }
    console.log('Duration outside: ', duration); // TODO: Remove, only for debugging
    return duration;
  };

  const getDuration = async () => {
    if (!trackingGeoFence || !trackingStart) return 0;
    let duration = trackingEnd ? trackingEnd - trackingStart : Date.now() - trackingStart;
    const locations = await readTrackingLocations();
    let alwaysInsideGeofence = true;
    for (const location of locations) {
      if (location.insideGeofence === false) {
        alwaysInsideGeofence = false;
        break;
      }
    }
    if (!alwaysInsideGeofence) duration -= getOutsideDuration(locations);
    console.log('Duration: ' + Math.floor(duration / 1000)); // TODO: Remove, only for debugging
    return Math.floor(duration / 1000);
  };

  const getScore = async () => {
    if (!trackingGeoFence) return 0;

    const duration = await getDuration();
    const scoreRatio = getGeoFenceScoreRatio(trackingGeoFence.category);
    const score = duration * scoreRatio;

    if (doubleScore) return score * 2;
    return score;
  };

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
    loadingUserLocation: loadingUserLocation,
    userLocation: userLocation,
    updateUserLocation: externalUpdateUserLocation,
    geoFences: geoFences,
    refetchGeoFences: refetch,
    unUploadedActivities: unUploadedActivities,
    currentGeoFence: currentGeoFence,
    trackingGeoFence: trackingGeoFence,
    trackingState: trackingState,
    trackingStart: trackingStart,
    trackingEnd: trackingEnd,
    getScore: getScore,
    getDuration: getDuration,
    startTracking: startTracking,
    resumeTracking: resumeTracking,
    pauseTracking: pauseTracking,
    stopTracking: stopTracking,
    discardActivity: discardActivity,
    doubleScore: doubleScore,
    updateDoubleScore: updateDoubleScore,
    friendId: friendId,
    setFriendId: setFriendId,
    score: score,
    duration: duration,
  };
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
