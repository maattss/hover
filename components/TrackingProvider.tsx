import React, { useState, ReactNode, useEffect } from 'react';
import { LatLng } from 'react-native-maps';
import { GeoFence, TrackedActivity } from '../types/geoFenceTypes';
import { convertToGeoFence } from '../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../tasks/locationBackgroundTasks';
import { useGeofencesQuery } from '../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTimestamp, getCurrentTimestamp } from '../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio, insideGeoFences } from '../helpers/geoFenceCalculations';
import { useInterval } from '../hooks/useInterval';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import useAuthentication from '../hooks/useAuthentication';

interface Props {
  children: ReactNode;
}

interface TrackingContextValues {
  locationPermission: PermissionResponse | undefined;
  userLocation: LocationObject | null;
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
  const userId = useAuthentication().user?.uid;
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
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
    if (locationPermission && locationPermission.status === 'granted') {
      console.log('Start background update');
      startBackgroundUpdate();
    } else if (locationPermission && locationPermission.status !== 'granted') {
      console.log('Stopped background update. Permission not accepted');
      stopBackgroundUpdate();
    }
  }, [locationPermission]);

  const getLocation = async () => {
    return await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
  };

  // Update user location every second
  const [ticking] = useState(true);
  const [counter, setCounter] = useState(0);
  useInterval(
    async () => {
      const newUserLocation = await getLocation();
      console.log('Checking user location...');
      setCounter(counter + 1);
      const differentLatitude = newUserLocation.coords.latitude !== userLocation?.coords.latitude;
      const differentLongitude = newUserLocation.coords.longitude !== userLocation?.coords.longitude;

      if (differentLatitude || differentLongitude) {
        console.log(
          'Updated user location... [' + newUserLocation.coords.latitude + ',' + newUserLocation.coords.longitude + ']',
        );
        setUserLocation(newUserLocation);
        // TODO: Rewrite insideGeofences helper to accept LocationObject and remove this const. After TrackingScreen and Mapscreen rewrite
        const tempLocationObject: LatLng | null = newUserLocation
          ? { latitude: newUserLocation?.coords.latitude, longitude: newUserLocation?.coords.longitude }
          : null;

        if (tempLocationObject) {
          const insideGeoFenceCheck = insideGeoFences(tempLocationObject, geoFences);
          if (insideGeoFenceCheck) {
            setInsideGeoFence(insideGeoFenceCheck);
            console.log('Inside geo fence!');
          }
        }
      }
    },
    ticking ? 5000 : null,
  );

  const addCompletedActivity = (activity: TrackedActivity) =>
    setCompletedActivities([...completedActivities, activity]);

  // Tracking
  const startTracking = () => {
    console.log('Start tracking');
    if (insideGeoFence) {
      setScore(0);
      setIsTrackingPaused(false);
      setIsTracking(true);
      setTrackingStart(getCurrentTimestamp());
    }
  };
  const pauseTracking = () => {
    console.log('Pause tracking');
    setIsTrackingPaused(true);
  };
  const stopTracking = async () => {
    console.log('Stop tracking');
    setIsTrackingPaused(true);
    setIsTracking(false);
    const activity = {
      geofence_id: insideGeoFence?.id,
      user_id: userId ?? '0', // TODO: Add real user_id
      score: score,
      started_at: trackingStart,
      duration: durationToTimestamp(duration),
    };

    try {
      const response = await InsertActivity({
        variables: {
          activity: activity,
        },
      });
      addCompletedActivity({
        caption: '',
        geofenceId: activity.geofence_id ?? 0,
        score: activity.score,
        startedAt: activity.started_at,
        duration: activity.duration,
        uploadedToDb: true,
      });

      console.log('Activity inserted to db', response);
      Alert.alert('Upload complete', 'Activity uploaded successfully!', [{ text: 'Cancel' }, { text: 'OK' }]);
    } catch (error) {
      console.error('Mutation error', error.message);
      addCompletedActivity({
        caption: '',
        geofenceId: activity.geofence_id ?? 0,
        score: activity.score,
        startedAt: activity.started_at,
        duration: activity.duration,
        uploadedToDb: false,
      });
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
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
