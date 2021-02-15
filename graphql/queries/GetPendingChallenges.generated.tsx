/* eslint-disable */
import * as Types from '../../types/types';

import { ListUserFragmentFragment, ChallengeFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { ListUserFragmentFragmentDoc, ChallengeFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type GetPendingChallengesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;

export type GetPendingChallengesQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & {
      readonly pending_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & ChallengeFragmentFragment;
        }
      >;
    } & ListUserFragmentFragment
  >;
};

export const GetPendingChallengesDocument = gql`
  query GetPendingChallenges($user_id: String!, $limit: Int!, $offset: Int!) {
    user(id: $user_id) {
      ...listUserFragment
      pending_challenges: challenge_participants(
        where: { state: { _eq: PENDING }, challenge: { state: { _eq: ACTIVE } } }
        limit: $limit
        offset: $offset
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
 * __useGetPendingChallengesQuery__
 *
 * To run a query within a React component, call `useGetPendingChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingChallengesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetPendingChallengesQuery(
  baseOptions: Apollo.QueryHookOptions<GetPendingChallengesQuery, GetPendingChallengesQueryVariables>,
) {
  return Apollo.useQuery<GetPendingChallengesQuery, GetPendingChallengesQueryVariables>(
    GetPendingChallengesDocument,
    baseOptions,
  );
}
export function useGetPendingChallengesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPendingChallengesQuery, GetPendingChallengesQueryVariables>,
) {
  return Apollo.useLazyQuery<GetPendingChallengesQuery, GetPendingChallengesQueryVariables>(
    GetPendingChallengesDocument,
    baseOptions,
  );
}
export type GetPendingChallengesQueryHookResult = ReturnType<typeof useGetPendingChallengesQuery>;
export type GetPendingChallengesLazyQueryHookResult = ReturnType<typeof useGetPendingChallengesLazyQuery>;
