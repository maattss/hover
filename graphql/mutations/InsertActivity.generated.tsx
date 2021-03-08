/* eslint-disable */
import * as Types from '../../types/types';

import { FullFeedFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { FullFeedFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type InsertActivityMutationVariables = Types.Exact<{
  activity: Types.Activities_Insert_Input;
}>;

export type InsertActivityMutation = { readonly __typename: 'mutation_root' } & {
  readonly insert_feed_one?: Types.Maybe<{ readonly __typename: 'feed' } & FullFeedFragmentFragment>;
};

export const InsertActivityDocument = gql`
  mutation InsertActivity($activity: activities_insert_input!) {
    insert_feed_one(object: { feed_type: ACTIVITY, activity: { data: $activity } }) {
      ...fullFeedFragment
    }
  }
  ${FullFeedFragmentFragmentDoc}
`;

/**
 * __useInsertActivityMutation__
 *
 * To run a mutation, you first call `useInsertActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertActivityMutation, { data, loading, error }] = useInsertActivityMutation({
 *   variables: {
 *      activity: // value for 'activity'
 *   },
 * });
 */
export function useInsertActivityMutation(
  baseOptions?: Apollo.MutationHookOptions<InsertActivityMutation, InsertActivityMutationVariables>,
) {
  return Apollo.useMutation<InsertActivityMutation, InsertActivityMutationVariables>(
    InsertActivityDocument,
    baseOptions,
  );
}
export type InsertActivityMutationHookResult = ReturnType<typeof useInsertActivityMutation>;
