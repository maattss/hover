/* eslint-disable */
import * as Types from '../types/types';

import { gql } from '@apollo/client';
export type BasicUserFragmentFragment = { readonly __typename: 'users' } & Pick<
  Types.Users,
  'id' | 'email' | 'name' | 'picture' | 'bio'
>;

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
> & {
    readonly comments: ReadonlyArray<{ readonly __typename: 'comments' } & CommentFragmentFragment>;
    readonly geofence: { readonly __typename: 'geofences' } & GeofenceFragmentFragment;
  };

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
  'id' | 'challenge_type' | 'start_date' | 'end_date' | 'is_active'
>;

export const BasicUserFragmentFragmentDoc = gql`
  fragment basicUserFragment on users {
    id
    email
    name
    picture
    bio
  }
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
    comments {
      ...commentFragment
    }
    geofence {
      ...geofenceFragment
    }
  }
  ${CommentFragmentFragmentDoc}
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
export const ChallengeFragmentFragmentDoc = gql`
  fragment challengeFragment on challenge {
    id
    challenge_type
    start_date
    end_date
    is_active
  }
`;
