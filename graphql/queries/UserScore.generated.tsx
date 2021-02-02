/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UserScoreQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  category?: Types.Maybe<Types.Scalars['String']>;
}>;

export type UserScoreQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & {
      readonly activities_aggregate: { readonly __typename: 'activities_aggregate' } & {
        readonly aggregate?: Types.Maybe<
          { readonly __typename: 'activities_aggregate_fields' } & {
            readonly sum?: Types.Maybe<
              { readonly __typename: 'activities_sum_fields' } & Pick<Types.Activities_Sum_Fields, 'score'>
            >;
          }
        >;
      };
    }
  >;
};

export const UserScoreDocument = gql`
  query UserScore($id: String!, $category: String) {
    user(id: $id) {
      activities_aggregate(where: { geofence: { category: { _eq: $category } } }) {
        aggregate {
          sum {
            score
          }
        }
      }
    }
  }
`;

/**
 * __useUserScoreQuery__
 *
 * To run a query within a React component, call `useUserScoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserScoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserScoreQuery({
 *   variables: {
 *      id: // value for 'id'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUserScoreQuery(baseOptions: Apollo.QueryHookOptions<UserScoreQuery, UserScoreQueryVariables>) {
  return Apollo.useQuery<UserScoreQuery, UserScoreQueryVariables>(UserScoreDocument, baseOptions);
}
export function useUserScoreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserScoreQuery, UserScoreQueryVariables>,
) {
  return Apollo.useLazyQuery<UserScoreQuery, UserScoreQueryVariables>(UserScoreDocument, baseOptions);
}
export type UserScoreQueryHookResult = ReturnType<typeof useUserScoreQuery>;
export type UserScoreLazyQueryHookResult = ReturnType<typeof useUserScoreLazyQuery>;
