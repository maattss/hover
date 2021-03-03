/* eslint-disable */
import * as Types from '../../types/types';

import { BasicUserFragmentFragment, AchievementFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { BasicUserFragmentFragmentDoc, AchievementFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type UpdateUserPushTokenMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  push_token: Types.Scalars['String'];
}>;

export type UpdateUserPushTokenMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_user?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
};

export const UpdateUserPushTokenDocument = gql`
  mutation UpdateUserPushToken($id: String!, $push_token: String!) {
    update_user(pk_columns: { id: $id }, _set: { push_token: $push_token }) {
      ...basicUserFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;

/**
 * __useUpdateUserPushTokenMutation__
 *
 * To run a mutation, you first call `useUpdateUserPushTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPushTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPushTokenMutation, { data, loading, error }] = useUpdateUserPushTokenMutation({
 *   variables: {
 *      id: // value for 'id'
 *      push_token: // value for 'push_token'
 *   },
 * });
 */
export function useUpdateUserPushTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserPushTokenMutation, UpdateUserPushTokenMutationVariables>,
) {
  return Apollo.useMutation<UpdateUserPushTokenMutation, UpdateUserPushTokenMutationVariables>(
    UpdateUserPushTokenDocument,
    baseOptions,
  );
}
export type UpdateUserPushTokenMutationHookResult = ReturnType<typeof useUpdateUserPushTokenMutation>;
