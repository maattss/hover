/* eslint-disable */
import * as Types from '../../types/types';

import {
  BasicUserFragmentFragment,
  ChallengeFragmentFragment,
  AchievementFragmentFragment,
  GeofenceFragmentFragment,
} from '../Fragments.generated';
import { gql } from '@apollo/client';
import {
  BasicUserFragmentFragmentDoc,
  ChallengeFragmentFragmentDoc,
  AchievementFragmentFragmentDoc,
  GeofenceFragmentFragmentDoc,
} from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type UpdateUserSignUpMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  name: Types.Scalars['String'];
  picture: Types.Scalars['String'];
}>;

export type UpdateUserSignUpMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_user?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
};

export const UpdateUserSignUpDocument = gql`
  mutation UpdateUserSignUp($id: String!, $name: String!, $picture: String!) {
    update_user(pk_columns: { id: $id }, _set: { name: $name, picture: $picture }) {
      ...basicUserFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;

/**
 * __useUpdateUserSignUpMutation__
 *
 * To run a mutation, you first call `useUpdateUserSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSignUpMutation, { data, loading, error }] = useUpdateUserSignUpMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      picture: // value for 'picture'
 *   },
 * });
 */
export function useUpdateUserSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserSignUpMutation, UpdateUserSignUpMutationVariables>,
) {
  return Apollo.useMutation<UpdateUserSignUpMutation, UpdateUserSignUpMutationVariables>(
    UpdateUserSignUpDocument,
    baseOptions,
  );
}
export type UpdateUserSignUpMutationHookResult = ReturnType<typeof useUpdateUserSignUpMutation>;
