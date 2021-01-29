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
  score: number;
};
export type AchievementFeedData = {
  name: string;
  picture: string;
};

export type ChallengeFeedData = {
  name: string;
};
