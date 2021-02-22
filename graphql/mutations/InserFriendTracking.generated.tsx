/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type InsertFriendTrackingMutationVariables = Types.Exact<{
  geofence_id: Types.Scalars['Int'];
  linking_word: Types.Scalars['String'];
  user_id: Types.Scalars['String'];
}>;

export type InsertFriendTrackingMutation = { readonly __typename: 'mutation_root' } & {
  readonly insert_friend_tracking?: Types.Maybe<
    { readonly __typename: 'friend_tracking_mutation_response' } & {
      readonly returning: ReadonlyArray<{ readonly __typename: 'friend_tracking' } & Pick<Types.Friend_Tracking, 'id'>>;
    }
  >;
};

export const InsertFriendTrackingDocument = gql`
  mutation InsertFriendTracking($geofence_id: Int!, $linking_word: String!, $user_id: String!) {
    insert_friend_tracking(
      objects: { geofence_id: $geofence_id, linking_word: $linking_word, user_start_id: $user_id }
    ) {
      returning {
        id
      }
    }
  }
`;

/**
 * __useInsertFriendTrackingMutation__
 *
 * To run a mutation, you first call `useInsertFriendTrackingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertFriendTrackingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertFriendTrackingMutation, { data, loading, error }] = useInsertFriendTrackingMutation({
 *   variables: {
 *      geofence_id: // value for 'geofence_id'
 *      linking_word: // value for 'linking_word'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useInsertFriendTrackingMutation(
  baseOptions?: Apollo.MutationHookOptions<InsertFriendTrackingMutation, InsertFriendTrackingMutationVariables>,
) {
  return Apollo.useMutation<InsertFriendTrackingMutation, InsertFriendTrackingMutationVariables>(
    InsertFriendTrackingDocument,
    baseOptions,
  );
}
export type InsertFriendTrackingMutationHookResult = ReturnType<typeof useInsertFriendTrackingMutation>;
