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
  'activity_id' | 'caption' | 'duration' | 'geofence_id' | 'score' | 'started_at' | 'stopped_at'
>;

export type ActivityFragmentFragment = { readonly __typename: 'activities' } & Pick<
  Types.Activities,
  'activity_id' | 'caption' | 'created_at'
> & { readonly geofence: { readonly __typename: 'geofences' } & GeofenceFragmentFragment };

export type CommentFragmentFragment = { readonly __typename: 'comments' } & Pick<
  Types.Comments,
  'comment_id' | 'activity_id' | 'content'
> & { readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment };

export type GeofenceFragmentFragment = { readonly __typename: 'geofences' } & Pick<
  Types.Geofences,
  'id' | 'name' | 'category' | 'coordinates' | 'description' | 'latitude' | 'longitude' | 'radius' | 'variant'
>;

export type ChallengeFragmentFragment = { readonly __typename: 'challenge' } & Pick<
  Types.Challenge,
  'id' | 'challenge_type' | 'created_at' | 'start_date' | 'end_date' | 'state' | 'rules'
> & { readonly created_by_user: { readonly __typename: 'users' } & BasicUserFragmentFragment };

export type AchievementFragmentFragment = { readonly __typename: 'achievement' } & Pick<
  Types.Achievement,
  'id' | 'description' | 'name' | 'achievement_type' | 'level' | 'created_at' | 'rule'
>;

export type OpponentFragmentFragment = { readonly __typename: 'challenge_participant' } & Pick<
  Types.Challenge_Participant,
  'state'
> & { readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment };

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
export const CommentFragmentFragmentDoc = gql`
  fragment commentFragment on comments {
    comment_id
    activity_id
    content
    user {
      ...basicUserFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;
export const ChallengeFragmentFragmentDoc = gql`
  fragment challengeFragment on challenge {
    id
    challenge_type
    created_at
    created_by_user {
      ...basicUserFragment
    }
    start_date
    end_date
    state
    rules
  }
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
  }
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
export const FullFeedFragmentFragmentDoc = gql`
  fragment fullFeedFragment on feed {
    id
    user {
      ...basicUserFragment
    }
    activity_id
    activity {
      ...basicActivityFragment
    }
    achievement_id
    user_achievement {
      achievement {
        ...achievementFragment
      }
    }
    created_at
  }
  ${BasicUserFragmentFragmentDoc}
  ${BasicActivityFragmentFragmentDoc}
  ${AchievementFragmentFragmentDoc}
`;
