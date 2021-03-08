/* eslint-disable */
import * as Types from '../../types/types';

import { ChallengeTypeFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { ChallengeTypeFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type ChallengeTypesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ChallengeTypesQuery = { readonly __typename: 'query_root' } & {
  readonly challenge_type: ReadonlyArray<{ readonly __typename: 'challenge_type' } & ChallengeTypeFragmentFragment>;
};

export const ChallengeTypesDocument = gql`
  query ChallengeTypes {
    challenge_type(order_by: { name: desc }) {
      ...challengeTypeFragment
    }
  }
  ${ChallengeTypeFragmentFragmentDoc}
`;

/**
 * __useChallengeTypesQuery__
 *
 * To run a query within a React component, call `useChallengeTypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChallengeTypesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChallengeTypesQuery({
 *   variables: {
 *   },
 * });
 */
export function useChallengeTypesQuery(
  baseOptions?: Apollo.QueryHookOptions<ChallengeTypesQuery, ChallengeTypesQueryVariables>,
) {
  return Apollo.useQuery<ChallengeTypesQuery, ChallengeTypesQueryVariables>(ChallengeTypesDocument, baseOptions);
}
export function useChallengeTypesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ChallengeTypesQuery, ChallengeTypesQueryVariables>,
) {
  return Apollo.useLazyQuery<ChallengeTypesQuery, ChallengeTypesQueryVariables>(ChallengeTypesDocument, baseOptions);
}
export type ChallengeTypesQueryHookResult = ReturnType<typeof useChallengeTypesQuery>;
export type ChallengeTypesLazyQueryHookResult = ReturnType<typeof useChallengeTypesLazyQuery>;
