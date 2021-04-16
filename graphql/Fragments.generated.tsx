/* eslint-disable */
import * as Types from '../types/types';

import { gql } from '@apollo/client';
export type ListUserFragmentFragment = { readonly __typename: 'users' } & Pick<Types.Users, 'id' | 'name' | 'picture'>;

export type BasicUserFragmentFragment = { readonly __typename: 'users' } & Pick<Types.Users, 'email' | 'bio'> &
  ListUserFragmentFragment;

export type UserFragmentFragment = { readonly __typename: 'users' } & {
  readonly followers: ReadonlyArray<
    { readonly __typename: 'followings' } & {
      readonly follower: { readonly __typename: 'users' } & BasicUserFragmentFragment;
    }
  >;
  readonly followers_aggregate: { readonly __typename: 'followings_aggregate' } & {
    readonly aggregate?: Types.Maybe<
      { readonly __typename: 'followings_aggregate_fields' } & Pick<Types.Followings_Aggregate_Fields, 'count'>
    >;
  };
  readonly following: ReadonlyArray<
    { readonly __typename: 'followings' } & {
      readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment;
    }
  >;
  readonly activities: ReadonlyArray<{ readonly __typename: 'activities' } & ActivityFragmentFragment>;
} & BasicUserFragmentFragment;

export type BasicActivityFragmentFragment = { readonly __typename: 'activities' } & Pick<
  Types.Activities,
  'activity_id' | 'caption' | 'duration' | 'geofence_id' | 'score' | 'started_at' | 'stopped_at' | 'friend_id'
>;

export type ActivityFragmentFragment = { readonly __typename: 'activities' } & Pick<
  Types.Activities,
  'activity_id' | 'caption' | 'created_at'
> & { readonly geofence: { readonly __typename: 'geofences' } & GeofenceFragmentFragment };

export type GeofenceFragmentFragment = { readonly __typename: 'geofences' } & Pick<
  Types.Geofences,
  'id' | 'name' | 'category' | 'coordinates' | 'description' | 'latitude' | 'longitude' | 'radius' | 'variant'
>;

export type ChallengeFragmentFragment = { readonly __typename: 'challenge' } & Pick<
  Types.Challenge,
  'id' | 'challenge_type' | 'created_at' | 'start_date' | 'end_date' | 'state' | 'rules'
> & {
    readonly created_by_user: { readonly __typename: 'users' } & ListUserFragmentFragment;
    readonly opponents: ReadonlyArray<{ readonly __typename: 'challenge_participant' } & OpponentFragmentFragment>;
  };

export type ChallengeFeedFragmentFragment = { readonly __typename: 'challenge' } & {
  readonly winner?: Types.Maybe<{ readonly __typename: 'users' } & ListUserFragmentFragment>;
} & ChallengeFragmentFragment;

export type AchievementFragmentFragment = { readonly __typename: 'achievement' } & Pick<
  Types.Achievement,
  'id' | 'description' | 'name' | 'achievement_type' | 'level' | 'created_at' | 'rule'
>;

export type OpponentFragmentFragment = { readonly __typename: 'challenge_participant' } & Pick<
  Types.Challenge_Participant,
  'state' | 'progress'
> & { readonly user: { readonly __typename: 'users' } & Pick<Types.Users, 'id' | 'name' | 'picture'> };

export type ChallengeTypeFragmentFragment = { readonly __typename: 'challenge_type' } & Pick<
  Types.Challenge_Type,
  'name' | 'description'
>;

export type ActivityFeedFragmentFragment = { readonly __typename: 'feed' } & Pick<Types.Feed, 'id' | 'created_at'> & {
    readonly user?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
    readonly activity?: Types.Maybe<{ readonly __typename: 'activities' } & BasicActivityFragmentFragment>;
  };

export type AchievementFeedFragmentFragment = { readonly __typename: 'feed' } & Pick<
  Types.Feed,
  'id' | 'created_at'
> & {
    readonly user?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
    readonly user_achievement?: Types.Maybe<
      { readonly __typename: 'user_achievement' } & {
        readonly achievement: { readonly __typename: 'achievement' } & AchievementFragmentFragment;
      }
    >;
  };

export type FeedActivityFragmentFragment = { readonly __typename: 'activities' } & Pick<
  Types.Activities,
  'activity_id' | 'caption' | 'duration' | 'geofence_id' | 'score' | 'created_at' | 'started_at' | 'stopped_at'
> & {
    readonly geofence: { readonly __typename: 'geofences' } & GeofenceFragmentFragment;
    readonly friend?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
  };

export type FullFeedFragmentFragment = { readonly __typename: 'feed' } & Pick<
  Types.Feed,
  'id' | 'activity_id' | 'achievement_id' | 'created_at'
> & {
    readonly user?: Types.Maybe<{ readonly __typename: 'users' } & ListUserFragmentFragment>;
    readonly activity?: Types.Maybe<{ readonly __typename: 'activities' } & FeedActivityFragmentFragment>;
    readonly user_achievement?: Types.Maybe<
      { readonly __typename: 'user_achievement' } & {
        readonly achievement: { readonly __typename: 'achievement' } & AchievementFragmentFragment;
      }
    >;
    readonly challenge?: Types.Maybe<{ readonly __typename: 'challenge' } & ChallengeFeedFragmentFragment>;
    readonly likes: ReadonlyArray<{ readonly __typename: 'likes' } & LikesFragmentFragment>;
  };

export type LikesFragmentFragment = { readonly __typename: 'likes' } & {
  readonly user: { readonly __typename: 'users' } & ListUserFragmentFragment;
};

export type NotificationFragmentFragment = { readonly __typename: 'notifications' } & Pick<
  Types.Notifications,
  'id' | 'type' | 'text' | 'seen' | 'user_id' | 'created_at'
>;

export type ProfileActivityFragmentFragment = { readonly __typename: 'feed' } & Pick<
  Types.Feed,
  'id' | 'activity_id' | 'created_at'
> & {
    readonly user?: Types.Maybe<
      { readonly __typename: 'users' } & Pick<Types.Users, 'streak'> & ListUserFragmentFragment
    >;
    readonly activity?: Types.Maybe<{ readonly __typename: 'activities' } & FeedActivityFragmentFragment>;
    readonly likes: ReadonlyArray<{ readonly __typename: 'likes' } & LikesFragmentFragment>;
  };

export const ListUserFragmentFragmentDoc = gql`
  fragment listUserFragment on users {
    id
    name
    picture
  }
`;
export const BasicUserFragmentFragmentDoc = gql`
  fragment basicUserFragment on users {
    ...listUserFragment
    email
    bio
  }
  ${ListUserFragmentFragmentDoc}
`;
export const GeofenceFragmentFragmentDoc = gql`
  fragment geofenceFragment on geofences {
    id
    name
    category
    coordinates
    description
    latitude
    longitude
    radius
    variant
  }
`;
export const ActivityFragmentFragmentDoc = gql`
  fragment activityFragment on activities {
    activity_id
    caption
    created_at
    geofence {
      ...geofenceFragment
    }
  }
  ${GeofenceFragmentFragmentDoc}
`;
export const UserFragmentFragmentDoc = gql`
  fragment userFragment on users {
    ...basicUserFragment
    followers {
      follower {
        ...basicUserFragment
      }
    }
    followers_aggregate {
      aggregate {
        count(distinct: true, columns: user_id)
      }
    }
    following {
      user {
        ...basicUserFragment
      }
    }
    activities {
      ...activityFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
  ${ActivityFragmentFragmentDoc}
`;
export const ChallengeTypeFragmentFragmentDoc = gql`
  fragment challengeTypeFragment on challenge_type {
    name
    description
  }
`;
export const BasicActivityFragmentFragmentDoc = gql`
  fragment basicActivityFragment on activities {
    activity_id
    caption
    duration
    geofence_id
    score
    started_at
    stopped_at
    friend_id
  }
`;
export const ActivityFeedFragmentFragmentDoc = gql`
  fragment activityFeedFragment on feed {
    id
    user {
      ...basicUserFragment
    }
    activity {
      ...basicActivityFragment
    }
    created_at
  }
  ${BasicUserFragmentFragmentDoc}
  ${BasicActivityFragmentFragmentDoc}
`;
export const AchievementFragmentFragmentDoc = gql`
  fragment achievementFragment on achievement {
    id
    description
    name
    achievement_type
    level
    created_at
    rule
  }
`;
export const AchievementFeedFragmentFragmentDoc = gql`
  fragment achievementFeedFragment on feed {
    id
    user {
      ...basicUserFragment
    }
    user_achievement {
      achievement {
        ...achievementFragment
      }
    }
    created_at
  }
  ${BasicUserFragmentFragmentDoc}
  ${AchievementFragmentFragmentDoc}
`;
export const FeedActivityFragmentFragmentDoc = gql`
  fragment feedActivityFragment on activities {
    activity_id
    caption
    duration
    geofence_id
    geofence {
      ...geofenceFragment
    }
    score
    created_at
    started_at
    stopped_at
    friend {
      ...basicUserFragment
    }
  }
  ${GeofenceFragmentFragmentDoc}
  ${BasicUserFragmentFragmentDoc}
`;
export const OpponentFragmentFragmentDoc = gql`
  fragment opponentFragment on challenge_participant {
    user {
      id
      name
      picture
    }
    state
    progress
  }
`;
export const ChallengeFragmentFragmentDoc = gql`
  fragment challengeFragment on challenge {
    id
    challenge_type
    created_at
    start_date
    end_date
    state
    rules
    created_by_user {
      ...listUserFragment
    }
    opponents: challenge_participants(order_by: { challenge_participant_state: { state: asc } }) {
      ...opponentFragment
    }
  }
  ${ListUserFragmentFragmentDoc}
  ${OpponentFragmentFragmentDoc}
`;
export const ChallengeFeedFragmentFragmentDoc = gql`
  fragment challengeFeedFragment on challenge {
    ...challengeFragment
    winner {
      ...listUserFragment
    }
  }
  ${ChallengeFragmentFragmentDoc}
  ${ListUserFragmentFragmentDoc}
`;
export const LikesFragmentFragmentDoc = gql`
  fragment likesFragment on likes {
    user {
      ...listUserFragment
    }
  }
  ${ListUserFragmentFragmentDoc}
`;
export const FullFeedFragmentFragmentDoc = gql`
  fragment fullFeedFragment on feed {
    id
    user {
      ...listUserFragment
    }
    activity_id
    activity {
      ...feedActivityFragment
    }
    achievement_id
    user_achievement {
      achievement {
        ...achievementFragment
      }
    }
    challenge {
      ...challengeFeedFragment
    }
    created_at
    likes {
      ...likesFragment
    }
  }
  ${ListUserFragmentFragmentDoc}
  ${FeedActivityFragmentFragmentDoc}
  ${AchievementFragmentFragmentDoc}
  ${ChallengeFeedFragmentFragmentDoc}
  ${LikesFragmentFragmentDoc}
`;
export const NotificationFragmentFragmentDoc = gql`
  fragment notificationFragment on notifications {
    id
    type
    text
    seen
    user_id
    created_at
  }
`;
export const ProfileActivityFragmentFragmentDoc = gql`
  fragment profileActivityFragment on feed {
    id
    user {
      ...listUserFragment
      streak
    }
    activity_id
    activity {
      ...feedActivityFragment
    }
    created_at
    likes {
      ...likesFragment
    }
  }
  ${ListUserFragmentFragmentDoc}
  ${FeedActivityFragmentFragmentDoc}
  ${LikesFragmentFragmentDoc}
`;
