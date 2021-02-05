/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GetChallengeParamsQueryVariables = Types.Exact<{
  user_id?: Types.Maybe<Types.Scalars['String']>;
}>;

export type GetChallengeParamsQuery = { readonly __typename: 'query_root' } & {
  readonly users: ReadonlyArray<{ readonly __typename: 'users' } & Pick<Types.Users, 'id' | 'name'>>;
  readonly challenge_type: ReadonlyArray<
    { readonly __typename: 'challenge_type' } & Pick<Types.Challenge_Type, 'name' | 'description'>
  >;
};

export const GetChallengeParamsDocument = gql`
  query GetChallengeParams($user_id: String) {
    users(order_by: { name: asc }, where: { id: { _neq: $user_id } }) {
      id
      name
    }
    challenge_type(order_by: { name: asc }) {
      name
      description
    }
  }
`;

/**
 * __useGetChallengeParamsQuery__
 *
 * To run a query within a React component, call `useGetChallengeParamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengeParamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengeParamsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetChallengeParamsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetChallengeParamsQuery, GetChallengeParamsQueryVariables>,
) {
  return Apollo.useQuery<GetChallengeParamsQuery, GetChallengeParamsQueryVariables>(
    GetChallengeParamsDocument,
    baseOptions,
  );
}
export function useGetChallengeParamsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChallengeParamsQuery, GetChallengeParamsQueryVariables>,
) {
  return Apollo.useLazyQuery<GetChallengeParamsQuery, GetChallengeParamsQueryVariables>(
    GetChallengeParamsDocument,
    baseOptions,
  );
}
export type GetChallengeParamsQueryHookResult = ReturnType<typeof useGetChallengeParamsQuery>;
export type GetChallengeParamsLazyQueryHookResult = ReturnType<typeof useGetChallengeParamsLazyQuery>;
