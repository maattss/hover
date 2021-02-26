/* eslint-disable */
import * as Types from '../../types/types';

import { NotificationFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { NotificationFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type NotifiactionsQueryVariables = Types.Exact<{
  limit?: Types.Maybe<Types.Scalars['Int']>;
  offset?: Types.Maybe<Types.Scalars['Int']>;
}>;

export type NotifiactionsQuery = { readonly __typename: 'query_root' } & {
  readonly notifications: ReadonlyArray<{ readonly __typename: 'notifications' } & NotificationFragmentFragment>;
};

export const NotifiactionsDocument = gql`
  query Notifiactions($limit: Int, $offset: Int) {
    notifications(order_by: { seen: asc, created_at: desc }) {
      ...notificationFragment
    }
  }
  ${NotificationFragmentFragmentDoc}
`;

/**
 * __useNotifiactionsQuery__
 *
 * To run a query within a React component, call `useNotifiactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotifiactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotifiactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useNotifiactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<NotifiactionsQuery, NotifiactionsQueryVariables>,
) {
  return Apollo.useQuery<NotifiactionsQuery, NotifiactionsQueryVariables>(NotifiactionsDocument, baseOptions);
}
export function useNotifiactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NotifiactionsQuery, NotifiactionsQueryVariables>,
) {
  return Apollo.useLazyQuery<NotifiactionsQuery, NotifiactionsQueryVariables>(NotifiactionsDocument, baseOptions);
}
export type NotifiactionsQueryHookResult = ReturnType<typeof useNotifiactionsQuery>;
export type NotifiactionsLazyQueryHookResult = ReturnType<typeof useNotifiactionsLazyQuery>;
