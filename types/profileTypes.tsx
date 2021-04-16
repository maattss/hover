import { AchievementFragmentFragment } from '../graphql/Fragments.generated';

export enum AchievementVariant {
  DEFAULT,
  SCORE,
  FIRST_ACTIVITY,
  SCORE_IN_CATEGORY,
}
export type AchievementRule = {
  category?: string;
  score?: number;
  streak_count?: number;
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
  achievements: readonly AchievementFragmentFragment[];
  streak: number;
};
