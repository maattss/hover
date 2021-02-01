import { AchievementType } from './feedTypes';

export type UserProfile = {
  bio: string;
  email: string;
  name: string;
  picture: string;
  totalScore: number;
  achievements: Achievement[];
};

export type Achievement = {
  description: string;
  name: string;
  achievementType?: string;
  createdAt?: string;
  level: number;
};
