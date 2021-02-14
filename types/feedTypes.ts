import { Achievement, Activity } from '../types/profileTypes';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

export type ActivityFeedData = {
  user: User;
  activity: Activity;
  createdAt: string;
};
export type AchievementFeedData = {
  user: User;
  achievement: Achievement;
  createdAt: string;
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
export type User = {
  bio: string;
  email: string;
  id: string;
  name: string;
  picture: string;
};

export type FeedData = ActivityFeedData | AchievementFeedData;
