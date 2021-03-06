/* eslint-disable */
import * as Types from '../../types/types';

import { BasicUserFragmentFragment, AchievementFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { BasicUserFragmentFragmentDoc, AchievementFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type ProfileUserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type ProfileUserQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & Pick<Types.Users, 'streak' | 'totalScore'> & {
        readonly user_achievement: ReadonlyArray<
          { readonly __typename: 'user_achievement' } & {
            readonly achievement: { readonly __typename: 'achievement' } & AchievementFragmentFragment;
          }
        >;
        readonly education_score: { readonly __typename: 'activities_aggregate' } & {
          readonly aggregate?: Types.Maybe<
            { readonly __typename: 'activities_aggregate_fields' } & {
              readonly sum?: Types.Maybe<
                { readonly __typename: 'activities_sum_fields' } & Pick<Types.Activities_Sum_Fields, 'score'>
              >;
            }
          >;
        };
        readonly culture_score: { readonly __typename: 'activities_aggregate' } & {
          readonly aggregate?: Types.Maybe<
            { readonly __typename: 'activities_aggregate_fields' } & {
              readonly sum?: Types.Maybe<
                { readonly __typename: 'activities_sum_fields' } & Pick<Types.Activities_Sum_Fields, 'score'>
              >;
            }
          >;
        };
        readonly social_score: { readonly __typename: 'activities_aggregate' } & {
          readonly aggregate?: Types.Maybe<
            { readonly __typename: 'activities_aggregate_fields' } & {
              readonly sum?: Types.Maybe<
                { readonly __typename: 'activities_sum_fields' } & Pick<Types.Activities_Sum_Fields, 'score'>
              >;
            }
          >;
        };
        readonly exercise_score: { readonly __typename: 'activities_aggregate' } & {
          readonly aggregate?: Types.Maybe<
            { readonly __typename: 'activities_aggregate_fields' } & {
              readonly sum?: Types.Maybe<
                { readonly __typename: 'activities_sum_fields' } & Pick<Types.Activities_Sum_Fields, 'score'>
              >;
            }
          >;
        };
      } & BasicUserFragmentFragment
  >;
};

export const ProfileUserDocument = gql`
  query ProfileUser($id: String!) {
    user(id: $id) {
      ...basicUserFragment
      streak
      totalScore
      user_achievement(order_by: { created_at: asc }) {
        achievement {
          ...achievementFragment
        }
      }
      education_score: activities_aggregate(where: { geofence: { category: { _eq: "EDUCATION" } } }) {
        aggregate {
          sum {
            score
          }
        }
      }
      culture_score: activities_aggregate(where: { geofence: { category: { _eq: "CULTURE" } } }) {
        aggregate {
          sum {
            score
          }
        }
      }
      social_score: activities_aggregate(where: { geofence: { category: { _eq: "SOCIAL" } } }) {
        aggregate {
          sum {
            score
          }
        }
      }
      exercise_score: activities_aggregate(where: { geofence: { category: { _eq: "EXERCISE" } } }) {
        aggregate {
          sum {
            score
          }
        }
      }
    }
  }
  ${BasicUserFragmentFragmentDoc}
  ${AchievementFragmentFragmentDoc}
`;

/**
 * __useProfileUserQuery__
 *
 * To run a query within a React component, call `useProfileUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProfileUserQuery(baseOptions: Apollo.QueryHookOptions<ProfileUserQuery, ProfileUserQueryVariables>) {
  return Apollo.useQuery<ProfileUserQuery, ProfileUserQueryVariables>(ProfileUserDocument, baseOptions);
}
export function useProfileUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileUserQuery, ProfileUserQueryVariables>,
) {
  return Apollo.useLazyQuery<ProfileUserQuery, ProfileUserQueryVariables>(ProfileUserDocument, baseOptions);
}
export type ProfileUserQueryHookResult = ReturnType<typeof useProfileUserQuery>;
export type ProfileUserLazyQueryHookResult = ReturnType<typeof useProfileUserLazyQuery>;
