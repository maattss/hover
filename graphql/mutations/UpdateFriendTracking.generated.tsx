/* eslint-disable */
import * as Types from '../../types/types';

import {
  BasicUserFragmentFragment,
  AchievementFragmentFragment,
  FeedActivityFragmentFragment,
} from '../Fragments.generated';
import { gql } from '@apollo/client';
import {
  BasicUserFragmentFragmentDoc,
  AchievementFragmentFragmentDoc,
  FeedActivityFragmentFragmentDoc,
} from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type UpdateFriendTrackingMutationVariables = Types.Exact<{
  linking_word: Types.Scalars['String'];
  user_id: Types.Scalars['String'];
  timestamp: Types.Scalars['timestamptz'];
  geofence_id: Types.Scalars['Int'];
}>;

export type UpdateFriendTrackingMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_friend_tracking?: Types.Maybe<
    { readonly __typename: 'friend_tracking_mutation_response' } & {
      readonly returning: ReadonlyArray<
        { readonly __typename: 'friend_tracking' } & {
          readonly user_start: { readonly __typename: 'users' } & BasicUserFragmentFragment;
        }
      >;
    }
  >;
};

export const UpdateFriendTrackingDocument = gql`
  mutation UpdateFriendTracking(
    $linking_word: String!
    $user_id: String!
    $timestamp: timestamptz!
    $geofence_id: Int!
  ) {
    update_friend_tracking(
      where: {
        linking_word: { _eq: $linking_word }
        _and: { join_limit: { _gte: $timestamp }, _and: { geofence_id: { _eq: $geofence_id } } }
      }
      _set: { user_join_id: $user_id }
    ) {
      returning {
        user_start {
          ...basicUserFragment
        }
      }
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;

/**
 * __useUpdateFriendTrackingMutation__
 *
 * To run a mutation, you first call `useUpdateFriendTrackingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFriendTrackingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFriendTrackingMutation, { data, loading, error }] = useUpdateFriendTrackingMutation({
 *   variables: {
 *      linking_word: // value for 'linking_word'
 *      user_id: // value for 'user_id'
 *      timestamp: // value for 'timestamp'
 *      geofence_id: // value for 'geofence_id'
 *   },
 * });
 */
export function useUpdateFriendTrackingMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateFriendTrackingMutation, UpdateFriendTrackingMutationVariables>,
) {
  return Apollo.useMutation<UpdateFriendTrackingMutation, UpdateFriendTrackingMutationVariables>(
    UpdateFriendTrackingDocument,
    baseOptions,
  );
}
export type UpdateFriendTrackingMutationHookResult = ReturnType<typeof useUpdateFriendTrackingMutation>;
