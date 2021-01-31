import { AchievementType } from './feedTypes';

export type UserProfile = {
  bio: string;
  created_at: string;
  email: string;
  name: string;
  picture: string;
  totalScore: number;
  achievement: Achievement[];
};

export type Achievement = {
  description: string;
  name: string;
  achievementType: AchievementType;
  createdAt: string;
};
