import { GeoFenceCategory } from '../types/geoFenceTypes';
import { getGeoFenceScoreRatio } from './geoFenceCalculations';
import { LocationEvent, PauseEvent, readLocationEvents, readPauseEvents, TrackingInfo } from './storage';

const getOutsideDuration = (locations: LocationEvent[]) => {
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
  return duration;
};

const getPausedDuration = (events: PauseEvent[]) => {
  let duration = 0;
  const previousEntry = {
    paused: true,
    timestamp: 0,
  };
  for (const event of events) {
    if (previousEntry.paused === true && event.paused === false) duration += event.timestamp - previousEntry.timestamp;

    previousEntry.timestamp = event.timestamp;
    previousEntry.paused = event.paused;
  }
  return duration;
};

export const getDuration = async (trackingInfo: TrackingInfo | undefined | null) => {
  if (!trackingInfo) return 0;
  let duration =
    trackingInfo.endTimestamp === 0
      ? Date.now() - trackingInfo.startTimestamp
      : trackingInfo.endTimestamp - trackingInfo.startTimestamp;

  const locations = await readLocationEvents();
  let alwaysInsideGeofence = true;
  for (const location of locations) {
    if (location.insideGeofence === false) {
      alwaysInsideGeofence = false;
      break;
    }
  }
  if (!alwaysInsideGeofence) duration -= getOutsideDuration(locations);

  const pauseEvents = await readPauseEvents();
  if (pauseEvents.length > 1) duration -= getPausedDuration(pauseEvents);
  return Math.floor(duration / 1000);
};

export const getScore = (duration: number, geoFenceCategory: GeoFenceCategory, friendId: string) => {
  const scoreRatio = getGeoFenceScoreRatio(geoFenceCategory);
  const score = duration * scoreRatio;

  if (friendId !== '') return score * 2;
  return score;
};
