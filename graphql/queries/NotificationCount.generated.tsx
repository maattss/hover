/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type NotificationCountQueryVariables = Types.Exact<{ [key: string]: never }>;

export type NotificationCountQuery = { readonly __typename: 'query_root' } & {
  readonly notifications_aggregate: { readonly __typename: 'notifications_aggregate' } & {
    readonly aggregate?: Types.Maybe<
      { readonly __typename: 'notifications_aggregate_fields' } & Pick<Types.Notifications_Aggregate_Fields, 'count'>
    >;
  };
};

export const NotificationCountDocument = gql`
  query NotificationCount {
    notifications_aggregate(where: { seen: { _eq: false } }) {
      aggregate {
        count(columns: id)
      }
    }
  }
`;

/**
 * __useNotificationCountQuery__
 *
 * To run a query within a React component, call `useNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationCountQuery(
  baseOptions?: Apollo.QueryHookOptions<NotificationCountQuery, NotificationCountQueryVariables>,
) {
  return Apollo.useQuery<NotificationCountQuery, NotificationCountQueryVariables>(
    NotificationCountDocument,
    baseOptions,
  );
}
export function useNotificationCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NotificationCountQuery, NotificationCountQueryVariables>,
) {
  return Apollo.useLazyQuery<NotificationCountQuery, NotificationCountQueryVariables>(
    NotificationCountDocument,
    baseOptions,
  );
}
export type NotificationCountQueryHookResult = ReturnType<typeof useNotificationCountQuery>;
export type NotificationCountLazyQueryHookResult = ReturnType<typeof useNotificationCountLazyQuery>;
