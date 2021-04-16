/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type HighscoreQueryVariables = Types.Exact<{
  timespan?: Types.Maybe<Types.Scalars['timestamptz']>;
  category?: Types.Maybe<Types.Scalars['String']>;
}>;

export type HighscoreQuery = { readonly __typename: 'query_root' } & {
  readonly leaderboard_users: ReadonlyArray<
    { readonly __typename: 'users' } & Pick<Types.Users, 'id' | 'name' | 'picture' | 'streak'> & {
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

export const HighscoreDocument = gql`
  query Highscore($timespan: timestamptz, $category: String) {
    leaderboard_users: users {
      id
      name
      picture
      streak
      activities_aggregate(
        where: { started_at: { _gt: $timespan }, geofence: { category: { _eq: $category } } }
        order_by: { score: desc_nulls_last }
      ) {
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
 * __useHighscoreQuery__
 *
 * To run a query within a React component, call `useHighscoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useHighscoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHighscoreQuery({
 *   variables: {
 *      timespan: // value for 'timespan'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useHighscoreQuery(baseOptions?: Apollo.QueryHookOptions<HighscoreQuery, HighscoreQueryVariables>) {
  return Apollo.useQuery<HighscoreQuery, HighscoreQueryVariables>(HighscoreDocument, baseOptions);
}
export function useHighscoreLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HighscoreQuery, HighscoreQueryVariables>,
) {
  return Apollo.useLazyQuery<HighscoreQuery, HighscoreQueryVariables>(HighscoreDocument, baseOptions);
}
export type HighscoreQueryHookResult = ReturnType<typeof useHighscoreQuery>;
export type HighscoreLazyQueryHookResult = ReturnType<typeof useHighscoreLazyQuery>;
