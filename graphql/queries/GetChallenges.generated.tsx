/* eslint-disable */
import * as Types from '../../types/types';

import {
  BasicUserFragmentFragment,
  ChallengeFragmentFragment,
  AchievementFragmentFragment,
  GeofenceFragmentFragment,
} from '../Fragments.generated';
import { gql } from '@apollo/client';
import {
  BasicUserFragmentFragmentDoc,
  ChallengeFragmentFragmentDoc,
  AchievementFragmentFragmentDoc,
  GeofenceFragmentFragmentDoc,
} from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type GetChallengesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;

export type GetChallengesQuery = { readonly __typename: 'query_root' } & {
  readonly user?: Types.Maybe<
    { readonly __typename: 'users' } & {
      readonly pending_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & {
            readonly opponents: ReadonlyArray<
              { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'state'> & {
                  readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment;
                }
            >;
          } & ChallengeFragmentFragment;
        }
      >;
      readonly ongoing_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & {
            readonly opponents: ReadonlyArray<
              { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'state'> & {
                  readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment;
                }
            >;
          } & ChallengeFragmentFragment;
        }
      >;
      readonly finished_challenges: ReadonlyArray<
        { readonly __typename: 'challenge_participant' } & {
          readonly challenge: { readonly __typename: 'challenge' } & {
            readonly opponents: ReadonlyArray<
              { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'state'> & {
                  readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment;
                }
            >;
          } & ChallengeFragmentFragment;
        }
      >;
    } & BasicUserFragmentFragment
  >;
};

export const GetChallengesDocument = gql`
  query GetChallenges($user_id: String!) {
    user(id: $user_id) {
      ...basicUserFragment
      pending_challenges: challenge_participants(
        where: { state: { _eq: PENDING }, challenge: { state: { _eq: ACTIVE } } }
      ) {
        challenge {
          ...challengeFragment
          opponents: challenge_participants(where: { user_id: { _neq: $user_id } }) {
            user {
              ...basicUserFragment
            }
            state
          }
        }
      }
      ongoing_challenges: challenge_participants(
        where: { state: { _eq: ACCEPTED }, challenge: { state: { _eq: ACTIVE } } }
      ) {
        challenge {
          ...challengeFragment
          opponents: challenge_participants(where: { user_id: { _neq: $user_id } }) {
            user {
              ...basicUserFragment
            }
            state
          }
        }
      }
      finished_challenges: challenge_participants(
        where: { state: { _eq: ACCEPTED }, challenge: { state: { _eq: FINISHED } } }
      ) {
        challenge {
          ...challengeFragment
          opponents: challenge_participants(where: { user_id: { _neq: $user_id } }) {
            user {
              ...basicUserFragment
            }
            state
          }
        }
      }
    }
  }
  ${BasicUserFragmentFragmentDoc}
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
