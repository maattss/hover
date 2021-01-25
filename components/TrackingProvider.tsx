import React, { useEffect, useState, ReactNode } from 'react';
import { LatLng } from 'react-native-maps';
import { GeoFence, TrackedActivity } from '../types/geoFenceTypes';

interface Props {
  children: ReactNode;
}

interface TrackingContextValues {
  userLocation: LatLng | null;
  completedActivities: TrackedActivity[];
  insideGeoFence: GeoFence | null;
  isTracking: boolean;
  trackingStart: string;
  score: number;
  duration: number;
}

export const TrackingContext = React.createContext<TrackingContextValues>({
  userLocation: null,
  completedActivities: [],
  insideGeoFence: null,
  isTracking: false,
  trackingStart: '',
  score: 0,
  duration: 0,
});
TrackingContext.displayName = 'TrackingContext';

export const TrackingProvider = ({ children }: Props) => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [insideGeoFence, setInsideGeoFence] = useState<GeoFence | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStart, setITracingStarte] = useState('');
  const [score, setScore] = useState(0);
  const [duration, setDuration] = useState(0);

  const value: TrackingContextValues = {
    userLocation: userLocation,
    completedActivities: completedActivities,
    insideGeoFence: insideGeoFence,
    isTracking: isTracking,
    trackingStart: trackingStart,
    score: score,
    duration: duration,
  };

  return <TrackingContext.Provider value={value}>{children}</TrackingContext.Provider>;
};

export default TrackingProvider;
