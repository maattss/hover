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
export type UpdateUserSettingsMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
  name: Types.Scalars['String'];
  bio: Types.Scalars['String'];
}>;

export type UpdateUserSettingsMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_user?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
};

export const UpdateUserSettingsDocument = gql`
  mutation UpdateUserSettings($id: String!, $name: String!, $bio: String!) {
    update_user(pk_columns: { id: $id }, _set: { name: $name, bio: $bio }) {
      ...basicUserFragment
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;

/**
 * __useUpdateUserSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateUserSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserSettingsMutation, { data, loading, error }] = useUpdateUserSettingsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateUserSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>,
) {
  return Apollo.useMutation<UpdateUserSettingsMutation, UpdateUserSettingsMutationVariables>(
    UpdateUserSettingsDocument,
    baseOptions,
  );
}
export type UpdateUserSettingsMutationHookResult = ReturnType<typeof useUpdateUserSettingsMutation>;
