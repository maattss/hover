/* eslint-disable */
import * as Types from '../../types/types';

import { ProfileActivityFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { ProfileActivityFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type ProfileActivitiesQueryVariables = Types.Exact<{
  id: Types.Scalars['String'];
  limit: Types.Scalars['Int'];
  offset: Types.Scalars['Int'];
}>;

export type ProfileActivitiesQuery = { readonly __typename: 'query_root' } & {
  readonly feed: ReadonlyArray<{ readonly __typename: 'feed' } & ProfileActivityFragmentFragment>;
};

export const ProfileActivitiesDocument = gql`
  query ProfileActivities($id: String!, $limit: Int!, $offset: Int!) {
    feed(
      where: { user_id: { _eq: $id }, feed_type: { _eq: ACTIVITY }, activity_id: { _is_null: false } }
      order_by: { created_at: desc }
      limit: $limit
      offset: $offset
    ) {
      ...profileActivityFragment
    }
  }
  ${ProfileActivityFragmentFragmentDoc}
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
 *      id: // value for 'id'
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
