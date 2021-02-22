/* eslint-disable */
import * as Types from '../../types/types';

import {
  BasicUserFragmentFragment,
  AchievementFragmentFragment,
  FeedActivityFragmentFragment,
} from '../Fragments.generated';
import { gql } from '@apollo/client';
import {
  BasicUserFragmentFragmentDoc,
  AchievementFragmentFragmentDoc,
  FeedActivityFragmentFragmentDoc,
} from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type GetFriendTrackingQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;

export type GetFriendTrackingQuery = { readonly __typename: 'query_root' } & {
  readonly friend_tracking: ReadonlyArray<
    { readonly __typename: 'friend_tracking' } & Pick<
      Types.Friend_Tracking,
      'id' | 'linking_word' | 'user_start_id' | 'user_join_id' | 'geofence_id' | 'date'
    > & {
        readonly user_start: { readonly __typename: 'users' } & BasicUserFragmentFragment;
        readonly user_join?: Types.Maybe<{ readonly __typename: 'users' } & BasicUserFragmentFragment>;
      }
  >;
};

export const GetFriendTrackingDocument = gql`
  query GetFriendTracking($id: Int!) {
    friend_tracking(where: { id: { _eq: $id } }) {
      id
      linking_word
      user_start_id
      user_start {
        ...basicUserFragment
      }
      user_join_id
      user_join {
        ...basicUserFragment
      }
      geofence_id
      date
    }
  }
  ${BasicUserFragmentFragmentDoc}
`;

/**
 * __useGetFriendTrackingQuery__
 *
 * To run a query within a React component, call `useGetFriendTrackingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFriendTrackingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFriendTrackingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFriendTrackingQuery(
  baseOptions: Apollo.QueryHookOptions<GetFriendTrackingQuery, GetFriendTrackingQueryVariables>,
) {
  return Apollo.useQuery<GetFriendTrackingQuery, GetFriendTrackingQueryVariables>(
    GetFriendTrackingDocument,
    baseOptions,
  );
}
export function useGetFriendTrackingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFriendTrackingQuery, GetFriendTrackingQueryVariables>,
) {
  return Apollo.useLazyQuery<GetFriendTrackingQuery, GetFriendTrackingQueryVariables>(
    GetFriendTrackingDocument,
    baseOptions,
  );
}
export type GetFriendTrackingQueryHookResult = ReturnType<typeof useGetFriendTrackingQuery>;
export type GetFriendTrackingLazyQueryHookResult = ReturnType<typeof useGetFriendTrackingLazyQuery>;
