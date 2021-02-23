import {
  AchievementFragmentFragment,
  ChallengeFeedFragmentFragment,
  FeedActivityFragmentFragment,
  ListUserFragmentFragment,
} from '../graphql/Fragments.generated';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

export type ActivityFeedData = {
  user: ListUserFragmentFragment;
  activity: FeedActivityFragmentFragment;
  createdAt: string;
  feedCategory: FeedCategory;
};
export type AchievementFeedData = {
  user: ListUserFragmentFragment;
  achievement: AchievementFragmentFragment;
  createdAt: string;
  feedCategory: FeedCategory;
};

export type ChallengeFeedData = {
  user: ListUserFragmentFragment;
  challenge: ChallengeFeedFragmentFragment;
  createdAt: string;
  feedCategory: FeedCategory;
};

export type FeedData = ActivityFeedData | AchievementFeedData | ChallengeFeedData;
