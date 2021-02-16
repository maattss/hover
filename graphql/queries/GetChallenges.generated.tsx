/* eslint-disable */
import * as Types from '../../types/types';

import { ListUserFragmentFragment, ChallengeFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { ListUserFragmentFragmentDoc, ChallengeFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type GetChallengesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
}>;

export type GetChallengesQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & {
      readonly pending_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & ChallengeFragmentFragment;
        }
      >;
      readonly ongoing_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & ChallengeFragmentFragment;
        }
      >;
      readonly finished_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & ChallengeFragmentFragment;
        }
      >;
    } & ListUserFragmentFragment
  >;
};

export const GetChallengesDocument = gql`
  query GetChallenges($user_id: String!, $limit: Int!) {
    user(id: $user_id) {
      ...listUserFragment
      pending_challenges: challenge_participants(
        where: { state: { _eq: PENDING }, challenge: { state: { _eq: ACTIVE } } }
        limit: $limit
        order_by: { challenge: { created_at: desc } }
      ) {
        challenge {
          ...challengeFragment
        }
      }
      ongoing_challenges: challenge_participants(
        where: { state: { _eq: ACCEPTED }, challenge: { state: { _eq: ACTIVE } } }
        limit: $limit
        order_by: { challenge: { created_at: desc } }
      ) {
        challenge {
          ...challengeFragment
        }
      }
      finished_challenges: challenge_participants(
        where: { state: { _eq: ACCEPTED }, challenge: { state: { _eq: FINISHED } } }
        limit: $limit
        order_by: { challenge: { created_at: desc } }
      ) {
        challenge {
          ...challengeFragment
        }
      }
    }
  }
  ${ListUserFragmentFragmentDoc}
  ${ChallengeFragmentFragmentDoc}
`;

/**
 * __useGetChallengesQuery__
 *
 * To run a query within a React component, call `useGetChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChallengesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetChallengesQuery(
  baseOptions: Apollo.QueryHookOptions<GetChallengesQuery, GetChallengesQueryVariables>,
) {
  return Apollo.useQuery<GetChallengesQuery, GetChallengesQueryVariables>(GetChallengesDocument, baseOptions);
}
export function useGetChallengesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetChallengesQuery, GetChallengesQueryVariables>,
) {
  return Apollo.useLazyQuery<GetChallengesQuery, GetChallengesQueryVariables>(GetChallengesDocument, baseOptions);
}
export type GetChallengesQueryHookResult = ReturnType<typeof useGetChallengesQuery>;
export type GetChallengesLazyQueryHookResult = ReturnType<typeof useGetChallengesLazyQuery>;
