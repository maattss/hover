/* eslint-disable */
import * as Types from '../../types/types';

import {
  BasicUserFragmentFragment,
  AchievementFragmentFragment,
  GeofenceFragmentFragment,
} from '../Fragments.generated';
import { gql } from '@apollo/client';
import {
  BasicUserFragmentFragmentDoc,
  AchievementFragmentFragmentDoc,
  GeofenceFragmentFragmentDoc,
} from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type UpdateUserMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  name: Types.Scalars['String'];
  picture: Types.Scalars['String'];
  bio: Types.Scalars['String'];
}>;

export type UpdateUserMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_user?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
};

export const UpdateUserDocument = gql`
  mutation UpdateUser($id: String!, $name: String!, $picture: String!, $bio: String!) {
    update_user(pk_columns: { id: $id }, _set: { name: $name, picture: $picture, bio: $bio }) {
      ...basicUserFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      picture: // value for 'picture'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>,
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
