/* eslint-disable */
import * as Types from '../../types/types';

import { FullFeedFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { FullFeedFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type FeedQueryVariables = Types.Exact<{
  limit?: Types.Maybe<Types.Scalars['Int']>;
}>;

export type FeedQuery = { readonly __typename: 'query_root' } & {
  readonly feed: ReadonlyArray<{ readonly __typename: 'feed' } & FullFeedFragmentFragment>;
};

export const FeedDocument = gql`
  query Feed($limit: Int) {
    feed(order_by: { created_at: desc }, limit: $limit) {
      ...fullFeedFragment
    }
  }
  ${FullFeedFragmentFragmentDoc}
`;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeedQuery(baseOptions?: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
  return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
}
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
  return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, baseOptions);
}
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
