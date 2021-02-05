/* eslint-disable */
import * as Types from '../../types/types';

import { ListUserFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { ListUserFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type GetFriendsQueryVariables = Types.Exact<{
  user_id?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetFriendsQuery = { readonly __typename: 'query_root' } & {
  readonly users: ReadonlyArray<{ readonly __typename: 'users' } & ListUserFragmentFragment>;
};

export const GetFriendsDocument = gql`
  query GetFriends($user_id: String) {
    users(order_by: { name: asc }, where: { id: { _neq: $user_id } }) {
      ...listUserFragment
    }
  }
  ${ListUserFragmentFragmentDoc}
`;

/**
 * __useGetFriendsQuery__
 *
 * To run a query within a React component, call `useGetFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetFriendsQuery(baseOptions?: Apollo.QueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>) {
  return Apollo.useQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, baseOptions);
}
export function useGetFriendsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFriendsQuery, GetFriendsQueryVariables>,
) {
  return Apollo.useLazyQuery<GetFriendsQuery, GetFriendsQueryVariables>(GetFriendsDocument, baseOptions);
}
export type GetFriendsQueryHookResult = ReturnType<typeof useGetFriendsQuery>;
export type GetFriendsLazyQueryHookResult = ReturnType<typeof useGetFriendsLazyQuery>;
