import { AchievementType } from './feedTypes';

export type UserProfile = {
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
};

export type Achievement = {
  description: string;
  name: string;
  achievementType?: string;
  createdAt?: string;
  level: number;
};
