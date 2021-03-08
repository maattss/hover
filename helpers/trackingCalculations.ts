import { LocationEvent, PauseEvent } from './storage';

export const getOutsideDuration = (locations: LocationEvent[]) => {
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

export const getPausedDuration = (events: PauseEvent[]) => {
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

// const getDuration = async () => {
//   if (!trackingGeoFence || !trackingStart) return 0;
//   let duration = trackingEnd ? trackingEnd - trackingStart : Date.now() - trackingStart;

//   const locations = await readLocationEvents();
//   let alwaysInsideGeofence = true;
//   for (const location of locations) {
//     if (location.insideGeofence === false) {
//       alwaysInsideGeofence = false;
//       break;
//     }
//   }
//   if (!alwaysInsideGeofence) duration -= getOutsideDuration(locations);

//   const pauseEvents = await readPauseEvents();
//   if (pauseEvents.length > 1) duration -= getPausedDuration(pauseEvents);
//   return Math.floor(duration / 1000);
// };

// const getScore = async () => {
//   if (!trackingGeoFence) return 0;

//   const duration = await getDuration();
//   const scoreRatio = getGeoFenceScoreRatio(trackingGeoFence.category);
//   const score = duration * scoreRatio;

//   if (doubleScore) return score * 2;
//   console.log('Updating score', score);
//   return score;
// };
