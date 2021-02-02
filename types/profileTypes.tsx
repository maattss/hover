export enum AchievementVariant {
  DEFAULT,
  SCORE,
  FIRST_ACTIVITY,
  SCORE_IN_CATEGORY,
}

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
  type: AchievementVariant;
  createdAt: string;
  level: number;
};
