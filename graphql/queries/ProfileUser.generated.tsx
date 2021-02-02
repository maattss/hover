/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type ProfileUserQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;

export type ProfileUserQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & Pick<Types.Users, 'bio' | 'email' | 'name' | 'picture' | 'totalScore'> & {
        readonly user_achievement: ReadonlyArray<
          { readonly __typename: 'user_achievement' } & {
            readonly achievement: { readonly __typename: 'achievement' } & Pick<
              Types.Achievement,
              'description' | 'name' | 'achievement_type' | 'level' | 'created_at' | 'rule'
            >;
          }
        >;
        readonly activities: ReadonlyArray<
          { readonly __typename: 'activities' } & Pick<
            Types.Activities,
            'caption' | 'created_at' | 'duration' | 'score' | 'started_at'
          > & {
              readonly geofence: { readonly __typename: 'geofences' } & Pick<
                Types.Geofences,
                | 'category'
                | 'description'
                | 'name'
                | 'variant'
                | 'latitude'
                | 'longitude'
                | 'id'
                | 'radius'
                | 'coordinates'
              >;
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
      }
  >;
};

export const ProfileUserDocument = gql`
  query ProfileUser($id: String!) {
    user(id: $id) {
      bio
      email
      name
      picture
      totalScore
      user_achievement(order_by: { created_at: asc }) {
        achievement {
          description
          name
          achievement_type
          level
          created_at
          rule
        }
      }
      activities(limit: 3, order_by: { created_at: desc }) {
        caption
        created_at
        duration
        geofence {
          category
          description
          name
          variant
          latitude
          longitude
          id
          radius
          coordinates
        }
        score
        started_at
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
