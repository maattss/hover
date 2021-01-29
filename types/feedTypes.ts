import { GeoFence } from './geoFenceTypes';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

export enum AchievementType {
  SCORE,
}

export type ActivityFeedData = {
  userName: string;
  picture: string;
  caption: string;
  geoFence: GeoFence;
  startedAt: string;
  score: number;
};
export type AchievementFeedData = {
  userName: string;
  picture: string;
  description: string;
  name: string;
  type: AchievementType;
  createdAt: string;
};

export type ChallengeFeedData = {
  name: string;
};
