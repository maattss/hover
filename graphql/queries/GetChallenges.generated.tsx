/* eslint-disable */
import * as Types from '../../types/types';

import { BasicUserFragmentFragment, ChallengeFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { BasicUserFragmentFragmentDoc, ChallengeFragmentFragmentDoc } from '../Fragments.generated';
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
              { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'accepted'> & {
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
              { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'accepted'> & {
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
              { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'accepted'> & {
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
        where: { accepted: { _eq: false }, challenge: { is_active: { _eq: true } } }
      ) {
        challenge {
          ...challengeFragment
          opponents: challenge_participants(where: { user_id: { _neq: $user_id } }) {
            accepted
            user {
              ...basicUserFragment
            }
          }
        }
      }
      ongoing_challenges: challenge_participants(
        where: { accepted: { _eq: true }, challenge: { is_active: { _eq: true } } }
      ) {
        challenge {
          ...challengeFragment
          opponents: challenge_participants(where: { user_id: { _neq: $user_id } }) {
            accepted
            user {
              ...basicUserFragment
            }
          }
        }
      }
      finished_challenges: challenge_participants(
        where: { accepted: { _eq: true }, challenge: { is_active: { _eq: false } } }
      ) {
        challenge {
          ...challengeFragment
          opponents: challenge_participants(where: { user_id: { _neq: $user_id } }) {
            accepted
            user {
              ...basicUserFragment
            }
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
