import {
  AchievementFragmentFragment,
  ChallengeFeedFragmentFragment,
  FeedActivityFragmentFragment,
  LikesFragmentFragment,
  ListUserFragmentFragment,
} from '../graphql/Fragments.generated';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

export type ActivityFeedData = {
  id: number;
  user: ListUserFragmentFragment;
  activity: FeedActivityFragmentFragment;
  createdAt: string;
  feedCategory: FeedCategory;
  likes: LikesFragmentFragment[];
};
export type AchievementFeedData = {
  id: number;
  user: ListUserFragmentFragment;
  achievement: AchievementFragmentFragment;
  createdAt: string;
  feedCategory: FeedCategory;
  likes: LikesFragmentFragment[];
};

export type ChallengeFeedData = {
  id: number;
  user: ListUserFragmentFragment;
  challenge: ChallengeFeedFragmentFragment;
  createdAt: string;
  feedCategory: FeedCategory;
  likes: LikesFragmentFragment[];
};

export type FeedData = ActivityFeedData | AchievementFeedData | ChallengeFeedData;
