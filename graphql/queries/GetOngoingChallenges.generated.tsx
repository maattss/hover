/* eslint-disable */
import * as Types from '../../types/types';

import { ListUserFragmentFragment, ChallengeFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { ListUserFragmentFragmentDoc, ChallengeFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type GetOngoingChallengesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;

export type GetOngoingChallengesQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & {
      readonly ongoing_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & ChallengeFragmentFragment;
        }
      >;
    } & ListUserFragmentFragment
  >;
};

export const GetOngoingChallengesDocument = gql`
  query GetOngoingChallenges($user_id: String!, $limit: Int!, $offset: Int!) {
    user(id: $user_id) {
      ...listUserFragment
      ongoing_challenges: challenge_participants(
        where: { state: { _eq: ACCEPTED }, challenge: { state: { _eq: ACTIVE } } }
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
 * __useGetOngoingChallengesQuery__
 *
 * To run a query within a React component, call `useGetOngoingChallengesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOngoingChallengesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOngoingChallengesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetOngoingChallengesQuery(
  baseOptions: Apollo.QueryHookOptions<GetOngoingChallengesQuery, GetOngoingChallengesQueryVariables>,
) {
  return Apollo.useQuery<GetOngoingChallengesQuery, GetOngoingChallengesQueryVariables>(
    GetOngoingChallengesDocument,
    baseOptions,
  );
}
export function useGetOngoingChallengesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOngoingChallengesQuery, GetOngoingChallengesQueryVariables>,
) {
  return Apollo.useLazyQuery<GetOngoingChallengesQuery, GetOngoingChallengesQueryVariables>(
    GetOngoingChallengesDocument,
    baseOptions,
  );
}
export type GetOngoingChallengesQueryHookResult = ReturnType<typeof useGetOngoingChallengesQuery>;
export type GetOngoingChallengesLazyQueryHookResult = ReturnType<typeof useGetOngoingChallengesLazyQuery>;
