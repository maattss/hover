import React, { useState, ReactNode, useEffect } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTimestamp, getCurrentTimestamp } from '../../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio, insideGeoFences } from '../../helpers/geoFenceCalculations';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { LatLng } from 'react-native-maps';
import { Activities_Insert_Input } from '../../types/types';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../../tasks/locationBackgroundtasks';

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
  trackingStart: Date | undefined;
  score: number;
  friendId: string;
  duration: number;
  doubleScore: boolean;
  updateDoubleScore: (value: boolean) => void;
  setFriendId: React.Dispatch<React.SetStateAction<string>>;
  startTracking: () => void;
  resumeTracking: () => void;
  pauseTracking: () => void;
  stopTracking: (caption: string) => void;
  discardActivity: () => void;
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
  score: 0,
  duration: 0,
  friendId: '',
  doubleScore: false,
  updateDoubleScore: () => console.error('Function not initialized'),
  setFriendId: () => console.error('Function not initialized'),
  startTracking: () => console.error('Function not initialized'),
  resumeTracking: () => console.error('Function not initialized'),
  pauseTracking: () => console.error('Function not initialized'),
  stopTracking: () => console.error('Function not initialized'),
  discardActivity: () => console.error('Function not initialized'),
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
  const [trackingStart, setTrackingStart] = useState<Date>();
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);
  const [doubleScore, setDoubleScore] = useState(false);
  const [friendId, setFriendId] = useState('');

  const [InsertActivity] = useInsertActivityMutation();
  const { data: geoFenceData, error: geoFenceFetchError, refetch } = useGeofencesQuery({
    nextFetchPolicy: 'network-only',
  });
  useEffect(() => {
    if (geoFenceData) {
      setGeoFences(convertToGeoFences(geoFenceData));
    }
    if (geoFenceFetchError) console.error(geoFenceFetchError.message);
  }, [geoFenceData, geoFenceFetchError]);

  const externalUpdateUserLocation = (newUserLocation: LatLng) => {
    updateUserLocation({
      coords: {
        latitude: newUserLocation.latitude,
        longitude: newUserLocation.longitude,
        altitude: null,
        accuracy: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    });
  };

  const updateUserLocation = (newUserLocation: LocationObject) => {
    setUserLocation(newUserLocation);
    if (loadingUserLocation) setLoadingUserLocation(false);
    console.log(
      'Updated user location... [' + newUserLocation.coords.latitude + ',' + newUserLocation.coords.longitude + ']',
    );

    const insideGeoFence = insideGeoFences(newUserLocation, geoFences);

    if (insideGeoFence) {
      setCurrentGeofence(insideGeoFence);
      if (trackingState === TrackingState.TRACKINGPAUSED && insideGeoFence.id === trackingGeoFence?.id) {
        console.log('Inside geofence! Tracking auto start');
        setTrackingState(TrackingState.TRACKING);
      }
    } else {
      setCurrentGeofence(undefined);
      if (trackingState === TrackingState.TRACKING) {
        console.log('Outside geofence! Tracking auto paused');
        setTrackingState(TrackingState.TRACKINGPAUSED);
      }
    }
  };

  const addUnUploadedActivity = (activity: Activities_Insert_Input) =>
    setUnUploadedActivities([...unUploadedActivities, activity]);

  const startTracking = () => {
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

    startBackgroundUpdate();
    setScore(0);
    setDuration(0);
    setTrackingState(TrackingState.TRACKING);
    setTrackingStart(new Date());
    setTrackingGeofence(currentGeoFence);
  };
  const resumeTracking = () => {
    setTrackingState(TrackingState.TRACKING);
  };
  const pauseTracking = () => {
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
      score: Math.floor(score),
      started_at: trackingStart,
      duration: durationToTimestamp(duration),
    };
    if (friendId) activity.friend_id = friendId;

    try {
      const response = await InsertActivity({
        variables: {
          activity: activity,
        },
      });
      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!', [{ text: 'OK' }]);
    } catch (error) {
      console.error('Mutation error', error.message);
      addUnUploadedActivity(activity);
    }
  };
  const updateDoubleScore = (value: boolean) => setDoubleScore(value);

  const getDuration = () => {
    if (!trackingGeoFence) return 0;
    // Calculate duration based on current time, start time and potential periods outside geofence
    const duration = 0;

    return duration;
  };

  const getScore = () => {
    if (!trackingGeoFence) return 0;

    const duration = getDuration();
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
    score: getScore(),
    duration: getDuration(),
    startTracking: startTracking,
    resumeTracking: resumeTracking,
    pauseTracking: pauseTracking,
    stopTracking: stopTracking,
    discardActivity: discardActivity,
    doubleScore: doubleScore,
    updateDoubleScore: updateDoubleScore,
    friendId: friendId,
    setFriendId: setFriendId,
  };
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
