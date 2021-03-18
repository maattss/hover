/* eslint-disable */
import * as Types from '../../types/types';

import { AchievementFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { AchievementFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type AchievementsQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;

export type AchievementsQuery = { readonly __typename: 'query_root' } & {
  readonly total_acheivements: { readonly __typename: 'achievement_aggregate' } & {
    readonly aggregate?: Types.Maybe<
      { readonly __typename: 'achievement_aggregate_fields' } & Pick<Types.Achievement_Aggregate_Fields, 'count'>
    >;
  };
  readonly unachievedachievements: ReadonlyArray<{ readonly __typename: 'achievement' } & AchievementFragmentFragment>;
  readonly user_achievement: ReadonlyArray<
    { readonly __typename: 'user_achievement' } & {
      readonly achievement: { readonly __typename: 'achievement' } & AchievementFragmentFragment;
    }
  >;
};

export const AchievementsDocument = gql`
  query Achievements($user_id: String!) {
    total_acheivements: achievement_aggregate {
      aggregate {
        count(columns: id)
      }
    }
    unachievedachievements(args: { uid: $user_id }) {
      ...achievementFragment
    }
    user_achievement(where: { user_id: { _eq: $user_id } }) {
      achievement {
        ...achievementFragment
      }
    }
  }
  ${AchievementFragmentFragmentDoc}
`;

/**
 * __useAchievementsQuery__
 *
 * To run a query within a React component, call `useAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAchievementsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useAchievementsQuery(
  baseOptions: Apollo.QueryHookOptions<AchievementsQuery, AchievementsQueryVariables>,
) {
  return Apollo.useQuery<AchievementsQuery, AchievementsQueryVariables>(AchievementsDocument, baseOptions);
}
export function useAchievementsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AchievementsQuery, AchievementsQueryVariables>,
) {
  return Apollo.useLazyQuery<AchievementsQuery, AchievementsQueryVariables>(AchievementsDocument, baseOptions);
}
export type AchievementsQueryHookResult = ReturnType<typeof useAchievementsQuery>;
export type AchievementsLazyQueryHookResult = ReturnType<typeof useAchievementsLazyQuery>;
