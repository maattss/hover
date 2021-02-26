import React, { useState, ReactNode, useEffect } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTimestamp, getCurrentTimestamp } from '../../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio, insideGeoFences } from '../../helpers/geoFenceCalculations';
import { useInterval } from '../../hooks/useInterval';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { LatLng } from 'react-native-maps';
import { Activities_Insert_Input } from '../../types/types';

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
  userLocation: LocationObject | null;
  updateUserLocation: (location: LatLng) => void;
  geoFences: GeoFence[];
  refetchGeofences: () => void;
  unUploadedActivities: Activities_Insert_Input[];
  insideGeoFence: GeoFence | null;
  trackingState: TrackingState;
  trackingStart: string;
  score: number;
  duration: number;
  startTracking: () => void;
  resumeTracking: () => void;
  pauseTracking: () => void;
  stopTracking: (caption: string) => void;
  discardActivity: () => void;
  doubleScore: boolean;
  updateDoubleScore: (value: boolean) => void;
  friendId: string;
  setFriendId: React.Dispatch<React.SetStateAction<string>>;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  locationPermission: undefined,
  loadingUserLocation: true,
  userLocation: null,
  updateUserLocation: () => console.error('Function not initialized'),
  geoFences: [],
  refetchGeofences: () => console.error('Function not initialized'),
  unUploadedActivities: [],
  insideGeoFence: null,
  trackingState: TrackingState.EXPLORE,
  trackingStart: '',
  score: 0,
  duration: 0,
  startTracking: () => console.error('Function not initialized'),
  resumeTracking: () => console.error('Function not initialized'),
  pauseTracking: () => console.error('Function not initialized'),
  stopTracking: () => console.error('Function not initialized'),
  discardActivity: () => console.error('Function not initialized'),
  doubleScore: false,
  updateDoubleScore: () => console.error('Function not initialized'),
  friendId: '',
  setFriendId: () => console.error('Function not initialized'),
});

TrackingContext.displayName = 'TrackingContext';

export const TrackingProvider = ({ children }: Props) => {
  const userId = useAuthentication().user?.uid;
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [loadingUserLocation, setLoadingUserLocation] = useState(false);
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [unUploadedActivities, setUnUploadedActivities] = useState<Activities_Insert_Input[]>([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [startGeoFence, setStartGeofence] = useState<GeoFence | null>(null);
  const [trackingState, setTrackingState] = useState<TrackingState>(TrackingState.EXPLORE);
  const [trackingStart, setTrackingStart] = useState('');
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
    if (userLocation === null) {
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
    }
  };

  const updateUserLocation = (newUserLocation: LocationObject) => {
    setUserLocation(newUserLocation);
    if (loadingUserLocation) setLoadingUserLocation(false);
    console.log(
      'Updated user location... [' + newUserLocation.coords.latitude + ',' + newUserLocation.coords.longitude + ']',
    );

    const insideGeoFenceCheck = insideGeoFences(newUserLocation, geoFences);
    if (insideGeoFenceCheck) {
      setInsideGeoFence(insideGeoFenceCheck);
      console.log('Inside geo fence!');
    } else {
      console.log('Outside geofence!');
    }
  };

  const locationInterval = () => {
    if (trackingState === TrackingState.TRACKING) return 15000;
    if (trackingState === TrackingState.TRACKINGPAUSED) return 5000;
    return null;
  };

  useInterval(async () => {
    const newUserLocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
    const differentLatitude = newUserLocation.coords.latitude !== userLocation?.coords.latitude;
    const differentLongitude = newUserLocation.coords.longitude !== userLocation?.coords.longitude;
    if (differentLatitude || differentLongitude) updateUserLocation(newUserLocation);

    if (!insideGeoFence) setTrackingState(TrackingState.TRACKINGPAUSED);
  }, locationInterval());

  const addUnUploadedActivity = (activity: Activities_Insert_Input) =>
    setUnUploadedActivities([...unUploadedActivities, activity]);

  // Tracking
  const startTracking = () => {
    if (locationPermission && locationPermission.status !== 'granted') {
      Alert.alert('Location permission not accepted', 'Location permission is required to start tracking');
      return;
    }
    if (!insideGeoFence) {
      Alert.alert(
        'Not inside a Hover zone',
        "Sorry, you can't start tracking here! Move to a Hover zone to start earning points.",
      );
      return;
    }

    setScore(0);
    setDuration(0);
    setTrackingState(TrackingState.TRACKING);
    setTrackingStart(getCurrentTimestamp());
    setStartGeofence(insideGeoFence);
  };
  const resumeTracking = () => {
    setTrackingState(TrackingState.TRACKING);
  };
  const pauseTracking = () => {
    setTrackingState(TrackingState.PUBLISH);
  };
  const discardActivity = () => {
    setTrackingState(TrackingState.EXPLORE);
  };

  const stopTracking = async (caption: string) => {
    if (startGeoFence?.id !== insideGeoFence?.id) {
      Alert.alert(
        'Moved Hover zone during activity',
        "You cannot end your activity in another Hover zone than where you started! Move back to: '" +
          startGeoFence?.name +
          "' to finish this activity. Or discard it...",
      );
      return;
    }
    setTrackingState(TrackingState.EXPLORE);
    const activity: Activities_Insert_Input = {
      caption: caption,
      geofence_id: insideGeoFence?.id,
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

  // Update score and duration every second
  useInterval(
    () => {
      if (insideGeoFence) {
        setDuration(duration + 1);
        const scoreRatio = getGeoFenceScoreRatio(insideGeoFence.category);
        const scoreIncrease = doubleScore ? 2 * scoreRatio : scoreRatio;
        setScore(score + scoreIncrease);
      }
    },
    trackingState === TrackingState.TRACKING ? 1000 : null,
  );

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
    loadingUserLocation: loadingUserLocation,
    userLocation: userLocation,
    updateUserLocation: externalUpdateUserLocation,
    geoFences: geoFences,
    refetchGeofences: refetch,
    unUploadedActivities: unUploadedActivities,
    insideGeoFence: insideGeoFence,
    trackingState: trackingState,
    trackingStart: trackingStart,
    score: score,
    duration: duration,
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
