import { GeoFence } from './geoFenceTypes';
import { Achievement as AchievementType } from '../types/profileTypes';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

export type ActivityFeedData = {
  userName: string;
  picture: string;
  caption: string;
  geoFence: GeoFence;
  startedAt: string;
  score: number;
  duration: number;
};
export type AchievementFeedData = {
  userName: string;
  picture: string;
  achievement: AchievementType;
};
export type ChallengeFeedData = {
  name: string;
  userPicture1: string;
  userPicture2: string;
  userName1: string;
  userName2: string;
  description: string;
  createdAt: string;
};
