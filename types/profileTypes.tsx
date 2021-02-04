import { ActivityFeedData } from './feedTypes';

export enum AchievementVariant {
  DEFAULT,
  SCORE,
  FIRST_ACTIVITY,
  SCORE_IN_CATEGORY,
}
export type AchievementRule = {
  category?: string;
  score?: number;
};

export type UserProfile = {
  id: string;
  bio: string;
  email: string;
  name: string;
  picture: string;
  totalScore: number;
  educationScore: number;
  cultureScore: number;
  socialScore: number;
  exerciseScore: number;
  achievements: Achievement[];
  activities: ActivityFeedData[];
};

export type Achievement = {
  description: string;
  name: string;
  type: AchievementVariant;
  createdAt: string;
  level: number;
  rule: AchievementRule;
};
