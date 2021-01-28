import { GeoFence } from './geoFenceTypes';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

export type ActivityFeedData = {
  name: string;
  picture: string;
  caption: string;
  geoFence: GeoFence;
  startedAt: string;
};
export type AchievementFeedData = {
  name: string;
};

export type ChallengeFeedData = {
  name: string;
};
