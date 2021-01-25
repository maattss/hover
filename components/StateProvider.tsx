import React, { useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase';
import Firebase from '../lib/firebase';
import { LatLng } from 'react-native-maps';
import { GeoFence, TrackedActivity } from '../types/geoFenceTypes';
import { convertToGeoFence } from '../helpers/objectMappers';
import { useGeofencesQuery } from '../graphql/queries/Geofences.generated';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { getLocationUpdate, startBackgroundUpdate } from '../tasks/locationBackgroundTasks';
import { startGeofencing } from '../tasks/geofenceTasks';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../lib/apollo';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

interface Props {
  children: ReactNode;
}

interface TrackingContextValues {
  locationPermission: PermissionResponse | undefined;
  userLocation: LatLng | null;
  setUserLocation: React.Dispatch<React.SetStateAction<LatLng | null>> | null;
  geoFences: GeoFence[];
  completedActivities: TrackedActivity[];
  addCompletedActivity: ((activity: TrackedActivity) => void) | null;
  insideGeoFence: GeoFence | null;
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>> | null;
  isTrackingPaused: boolean;
  setIsTrackingPaused: React.Dispatch<React.SetStateAction<boolean>> | null;
  trackingStart: string;
  setTrackingStart: React.Dispatch<React.SetStateAction<string>> | null;
  score: number;
  duration: number;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  locationPermission: undefined,
  userLocation: null,
  setUserLocation: null,
  geoFences: [],
  completedActivities: [],
  addCompletedActivity: null,
  insideGeoFence: null,
  isTracking: false,
  setIsTracking: null,
  isTrackingPaused: true,
  setIsTrackingPaused: null,
  trackingStart: '',
  setTrackingStart: null,
  score: 0,
  duration: 0,
});
TrackingContext.displayName = 'TrackingContext';

interface AuthContextValues {
  user: User | null;
  isLoadingUser: boolean;
}

export const AuthContext = React.createContext<AuthContextValues>({ user: null, isLoadingUser: true });
AuthContext.displayName = 'AuthContext';

export const StateProvider = ({ children }: Props) => {
  const [userAuthState, setUserAuthState] = useState<User | null>(null);
  const [isLoadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserAuthState(user);
        setLoadingUser(false);
      } else {
        setUserAuthState(null);
        setLoadingUser(false);
      }
    });
  }, []);

  const authValue: AuthContextValues = {
    user: userAuthState,
    isLoadingUser: isLoadingUser,
  };

  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [completedActivities, setCompletedActivities] = useState<TrackedActivity[]>([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isTrackingPaused, setIsTrackingPaused] = useState(false);
  const [trackingStart, setTrackingStart] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

  const { error: fetchError, data: data } = useGeofencesQuery();

  useEffect(() => {
    if (locationPermission && locationPermission.status !== 'granted') {
      startBackgroundUpdate();
    }
  }, [locationPermission]);

  useEffect(() => {
    if (data) setGeoFences(convertToGeoFence(data));
    if (fetchError) console.error(fetchError.message);
  }, [data, fetchError]);

  const addCompletedActivity = (activity: TrackedActivity) =>
    setCompletedActivities([...completedActivities, activity]);

  const trackingValue: TrackingContextValues = {
    locationPermission: locationPermission,
    userLocation: userLocation,
    setUserLocation: setUserLocation,
    geoFences: geoFences,
    completedActivities: completedActivities,
    addCompletedActivity: addCompletedActivity,
    insideGeoFence: insideGeoFence,
    isTracking: isTracking,
    setIsTracking: setIsTracking,
    isTrackingPaused: isTrackingPaused,
    setIsTrackingPaused: setIsTrackingPaused,
    trackingStart: trackingStart,
    setTrackingStart: setTrackingStart,
    score: score,
    duration: duration,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <TrackingContext.Provider value={trackingValue}>{children}</TrackingContext.Provider>
    </AuthContext.Provider>
  );
};

export default StateProvider;
