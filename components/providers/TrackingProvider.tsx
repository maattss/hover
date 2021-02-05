import React, { useState, ReactNode, useEffect } from 'react';
import { GeoFence } from '../../types/geoFenceTypes';
import { convertToGeoFences } from '../../helpers/objectMappers';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { startBackgroundUpdate, stopBackgroundUpdate } from '../../tasks/locationBackgroundTasks';
import { useGeofencesQuery } from '../../graphql/queries/Geofences.generated';
import { useInsertActivityMutation } from '../../graphql/mutations/InsertActivity.generated';
import { Alert } from 'react-native';
import { durationToTimestamp, getCurrentTimestamp } from '../../helpers/dateTimeHelpers';
import { getGeoFenceScoreRatio, insideGeoFences } from '../../helpers/geoFenceCalculations';
import { useInterval } from '../../hooks/useInterval';
import * as Location from 'expo-location';
import { LocationObject } from 'expo-location';
import useAuthentication from '../../hooks/useAuthentication';
import { Activities_Insert_Input } from '../../types/types';

interface Props {
  children: ReactNode;
}

export enum TrackingState {
  EXPLORE,
  TRACKING,
  PUBLISH,
}

interface TrackingContextValues {
  locationPermission: PermissionResponse | undefined;
  userLocation: LocationObject | null;
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
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  locationPermission: undefined,
  userLocation: null,
  geoFences: [],
  refetchGeofences: () => {
    console.error('Function not initialized');
  },
  unUploadedActivities: [],
  insideGeoFence: null,
  trackingState: TrackingState.EXPLORE,
  trackingStart: '',
  score: 0,
  duration: 0,
  startTracking: () => {
    console.error('Function not initialized');
  },
  resumeTracking: () => {
    console.error('Function not initialized');
  },
  pauseTracking: () => {
    console.error('Function not initialized');
  },
  stopTracking: () => {
    console.error('Function not initialized');
  },
  discardActivity: () => {
    console.error('Function not initialized');
  },
});
TrackingContext.displayName = 'TrackingContext';

export const TrackingProvider = ({ children }: Props) => {
  const userId = useAuthentication().user?.uid;
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [userLocation, setUserLocation] = useState<LocationObject | null>(null);
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [unUploadedActivities, setUnUploadedActivities] = useState<Activities_Insert_Input[]>([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [trackingState, setTrackingState] = useState<TrackingState>(TrackingState.EXPLORE);
  const [trackingStart, setTrackingStart] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

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

        const insideGeoFenceCheck = insideGeoFences(newUserLocation, geoFences);
        if (insideGeoFenceCheck) {
          setInsideGeoFence(insideGeoFenceCheck);
          console.log('Inside geo fence!');
        } else {
          console.log('Outside geofence!');
        }
      }
    },
    ticking ? 5000 : null,
  );

  const addUnUploadedActivity = (activity: Activities_Insert_Input) =>
    setUnUploadedActivities([...unUploadedActivities, activity]);

  // Tracking
  const startTracking = () => {
    if (insideGeoFence) {
      setScore(0);
      setDuration(0);
      setTrackingState(TrackingState.TRACKING);
      setTrackingStart(getCurrentTimestamp());
    }
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
    setTrackingState(TrackingState.EXPLORE);
    const activity = {
      caption: caption,
      geofence_id: insideGeoFence?.id,
      user_id: userId ?? '0',
      score: Math.floor(score),
      started_at: trackingStart,
      duration: durationToTimestamp(duration),
    };

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

  // Update score and duration every second
  useInterval(
    () => {
      console.log('Tracking...');
      if (insideGeoFence) {
        setDuration(duration + 1);
        setScore(score + 1 * getGeoFenceScoreRatio(insideGeoFence.category));
      }
    },
    trackingState === TrackingState.TRACKING ? 1000 : null,
  );

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
    userLocation: userLocation,
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
  };
  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;