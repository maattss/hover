export enum AchievementVariant {
  SCORE,
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
  type: string;
  createdAt: string;
  level: number;
};
