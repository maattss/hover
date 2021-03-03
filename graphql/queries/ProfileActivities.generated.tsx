/* eslint-disable */
import * as Types from '../../types/types';

import { FeedActivityFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { FeedActivityFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type ProfileActivitiesQueryVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;

export type ProfileActivitiesQuery = { readonly __typename: 'query_root' } & {
  readonly activities: ReadonlyArray<{ readonly __typename: 'activities' } & FeedActivityFragmentFragment>;
};

export const ProfileActivitiesDocument = gql`
  query ProfileActivities($user_id: String!, $limit: Int!, $offset: Int!) {
    activities(where: { user_id: { _eq: $user_id } }, order_by: { created_at: asc }, limit: $limit, offset: $offset) {
      ...feedActivityFragment
    }
  }
  ${FeedActivityFragmentFragmentDoc}
`;

/**
 * __useProfileActivitiesQuery__
 *
 * To run a query within a React component, call `useProfileActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileActivitiesQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useProfileActivitiesQuery(
  baseOptions: Apollo.QueryHookOptions<ProfileActivitiesQuery, ProfileActivitiesQueryVariables>,
) {
  return Apollo.useQuery<ProfileActivitiesQuery, ProfileActivitiesQueryVariables>(
    ProfileActivitiesDocument,
    baseOptions,
  );
}
export function useProfileActivitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ProfileActivitiesQuery, ProfileActivitiesQueryVariables>,
) {
  return Apollo.useLazyQuery<ProfileActivitiesQuery, ProfileActivitiesQueryVariables>(
    ProfileActivitiesDocument,
    baseOptions,
  );
}
export type ProfileActivitiesQueryHookResult = ReturnType<typeof useProfileActivitiesQuery>;
export type ProfileActivitiesLazyQueryHookResult = ReturnType<typeof useProfileActivitiesLazyQuery>;
