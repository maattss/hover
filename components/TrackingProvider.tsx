import React, { useState, ReactNode, useEffect } from 'react';
import { LatLng } from 'react-native-maps';
import { GeoFence, TrackedActivity } from '../types/geoFenceTypes';
import { convertToGeoFence } from '../helpers/objectMappers';
import { useGeofencesQuery } from '../graphql/queries/Geofences.generated';
import { usePermissions, LOCATION, PermissionResponse } from 'expo-permissions';
import { startBackgroundUpdate } from '../tasks/locationBackgroundTasks';
import { startGeofencing } from '../tasks/geofenceTasks';

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
  setInsideGeoFence: React.Dispatch<React.SetStateAction<GeoFence | null>> | null;
  isTracking: boolean;
  setIsTracking: React.Dispatch<React.SetStateAction<boolean>> | null;
  trackingStart: string;
  setTrackingStart: React.Dispatch<React.SetStateAction<string>> | null;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>> | null;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>> | null;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  locationPermission: undefined,
  userLocation: null,
  setUserLocation: null,
  geoFences: [],
  completedActivities: [],
  addCompletedActivity: null,
  insideGeoFence: null,
  setInsideGeoFence: null,
  isTracking: false,
  setIsTracking: null,
  trackingStart: '',
  setTrackingStart: null,
  score: 0,
  setScore: null,
  duration: 0,
  setDuration: null,
});
TrackingContext.displayName = 'TrackingContext';

// const { data: data } = useGeofencesQuery();
// // TODO: Remove
// useEffect(() => {
//   getLocationsPermissions();
//   startBackgroundUpdate();
//   if (data) startGeofencing(data);
// }, [data]);

export const TrackingProvider = ({ children }: Props) => {
  const [locationPermission] = usePermissions(LOCATION, { ask: true });
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [completedActivities, setCompletedActivities] = useState<TrackedActivity[]>([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStart, setTrackingStart] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

  const { error: fetchError, data: data } = useGeofencesQuery();

  useEffect(() => {
    if (locationPermission && locationPermission.status !== 'granted') {
      startBackgroundUpdate();
      if (data) startGeofencing(data);
    }
  }, [data, locationPermission]);

  useEffect(() => {
    if (data) setGeoFences(convertToGeoFence(data));
    if (fetchError) console.error(fetchError.message);
  }, [data, fetchError]);

  const addCompletedActivity = (activity: TrackedActivity) =>
    setCompletedActivities([...completedActivities, activity]);

  const value: TrackingContextValues = {
    locationPermission: locationPermission,
    userLocation: userLocation,
    setUserLocation: setUserLocation,
    geoFences: geoFences,
    completedActivities: completedActivities,
    addCompletedActivity: addCompletedActivity,
    insideGeoFence: insideGeoFence,
    setInsideGeoFence: setInsideGeoFence,
    isTracking: isTracking,
    setIsTracking: setIsTracking,
    trackingStart: trackingStart,
    setTrackingStart: setTrackingStart,
    score: score,
    setScore: setScore,
    duration: duration,
    setDuration: setDuration,
  };

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
