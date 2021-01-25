import React, { useEffect, useState, ReactNode, SetStateAction } from 'react';
import { LatLng } from 'react-native-maps';
import { GeoFence, TrackedActivity } from '../types/geoFenceTypes';

interface Props {
  children: ReactNode;
}

interface TrackingContextValues {
  userLocation: LatLng | null;
  completedActivities: TrackedActivity[];
  addCompletedActivity: (activity: TrackedActivity) => void | null;
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
  userLocation: null,
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

export const TrackingProvider = ({ children }: Props) => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [completedActivities, setCompletedActivities] = useState<TrackedActivity[]>([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStart, setTrackingStart] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

  const addCompletedActivity = (activity: TrackedActivity) =>
    setCompletedActivities([...completedActivities, activity]);

  const value: TrackingContextValues = {
    userLocation: userLocation,
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
