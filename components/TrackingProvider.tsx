import React, { useState, ReactNode, useEffect } from 'react';
import { LatLng } from 'react-native-maps';
import { GeoFence, TrackedActivity } from '../types/geoFenceTypes';
import { convertToGeoFence } from '../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { getLocationUpdate, startBackgroundUpdate } from '../tasks/locationBackgroundTasks';
import { startGeofencing } from '../tasks/geofenceTasks';
import { useGeofencesQuery } from '../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTimestamp, getCurrentTimestamp } from '../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio } from '../helpers/geoFenceCalculations';
import { useInterval } from '../hooks/useInterval';

interface Props {
  children: ReactNode;
}

interface TrackingContextValues {
  locationPermission: PermissionResponse | undefined;
  userLocation: LatLng | null;
  setUserLocation: React.Dispatch<React.SetStateAction<LatLng | null>> | null;
  geoFences: GeoFence[];
  completedActivities: TrackedActivity[];
  insideGeoFence: GeoFence | null;
  isTracking: boolean;
  isTrackingPaused: boolean;
  trackingStart: string;
  score: number;
  duration: number;
  startTracking: () => void;
  pauseTracking: () => void;
  stopTracking: () => void;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  locationPermission: undefined,
  userLocation: null,
  setUserLocation: null,
  geoFences: [],
  completedActivities: [],
  insideGeoFence: null,
  isTracking: false,
  isTrackingPaused: true,
  trackingStart: '',
  score: 0,
  duration: 0,
  startTracking: () => {
    console.error('Function not initialized');
  },
  pauseTracking: () => {
    console.error('Function not initialized');
  },
  stopTracking: () => {
    console.error('Function not initialized');
  },
});
TrackingContext.displayName = 'TrackingContext';

export const TrackingProvider = ({ children }: Props) => {
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [completedActivities, setCompletedActivities] = useState<TrackedActivity[]>([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isTrackingPaused, setIsTrackingPaused] = useState(true);
  const [trackingStart, setTrackingStart] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

  const [InsertActivity] = useInsertActivityMutation();
  const { data: geoFenceData, error: geoFenceFetchError } = useGeofencesQuery();
  useEffect(() => {
    if (geoFenceData) {
      setGeoFences(convertToGeoFence(geoFenceData));
    }
    if (geoFenceFetchError) console.error(geoFenceFetchError.message);
  }, [geoFenceData, geoFenceFetchError]);

  useEffect(() => {
    if (locationPermission && locationPermission.status !== 'granted') {
      console.log('Start background update');
      startBackgroundUpdate();
    }
  }, [locationPermission]);

  // Update user location every second
  const [ticking] = useState(true);
  useInterval(
    async () => {
      console.log('Updating...');
      console.log(await getLocationUpdate());
    },
    ticking ? 1000 : null,
  );

  const addCompletedActivity = (activity: TrackedActivity) =>
    setCompletedActivities([...completedActivities, activity]);

  // Tracking
  const startTracking = () => {
    if (insideGeoFence) {
      // TODO: Stop geofencing
      setScore(0);
      setIsTrackingPaused(false);
      setIsTracking(true);
      setTrackingStart(getCurrentTimestamp());
    }
  };
  const pauseTracking = () => {
    setIsTrackingPaused(true);
  };
  const stopTracking = async () => {
    setIsTrackingPaused(true);
    setIsTracking(false);

    try {
      const activity = {
        geofence_id: insideGeoFence?.id,
        user_id: '123', // TODO: Add real user_id
        score: score,
        started_at: trackingStart,
        duration: durationToTimestamp(duration),
      };
      const response = await InsertActivity({
        variables: {
          activity: activity,
        },
      });
      // TODO: Add to complete activity list
      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!', [{ text: 'Cancel' }, { text: 'OK' }]);

      // TODO: Start geofencing
    } catch (error) {
      console.error('Mutation error', error.message);
    }
  };

  // Update score and duration every second. May need to move this to task?
  useInterval(
    () => {
      console.log('Tracking...');
      if (insideGeoFence) {
        setDuration(duration + 1);
        setScore(Math.round(score + 1 * getGeoFenceScoreRatio(insideGeoFence.category)));
      }
    },
    isTrackingPaused ? null : 1000,
  );

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
    userLocation: userLocation,
    setUserLocation: setUserLocation,
    geoFences: geoFences,
    completedActivities: completedActivities,
    insideGeoFence: insideGeoFence,
    isTracking: isTracking,
    isTrackingPaused: isTrackingPaused,
    trackingStart: trackingStart,
    score: score,
    duration: duration,
    startTracking: startTracking,
    pauseTracking: pauseTracking,
    stopTracking: stopTracking,
  };

  console.log('Tracking provider values updated', value);
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
