/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type GeofencesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GeofencesQuery = { readonly __typename: 'query_root' } & {
  readonly geofences: ReadonlyArray<
    { readonly __typename: 'geofences' } & Pick<
      Types.Geofences,
      'id' | 'name' | 'description' | 'latitude' | 'longitude' | 'radius' | 'variant' | 'coordinates' | 'category'
    >
  >;
};

export const GeofencesDocument = gql`
  query Geofences {
    geofences {
      id
      name
      description
      latitude
      longitude
      radius
      variant
      coordinates
      category
    }
  }
`;

/**
 * __useGeofencesQuery__
 *
 * To run a query within a React component, call `useGeofencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGeofencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGeofencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGeofencesQuery(baseOptions?: Apollo.QueryHookOptions<GeofencesQuery, GeofencesQueryVariables>) {
  return Apollo.useQuery<GeofencesQuery, GeofencesQueryVariables>(GeofencesDocument, baseOptions);
}
export function useGeofencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GeofencesQuery, GeofencesQueryVariables>,
) {
  return Apollo.useLazyQuery<GeofencesQuery, GeofencesQueryVariables>(GeofencesDocument, baseOptions);
}
export type GeofencesQueryHookResult = ReturnType<typeof useGeofencesQuery>;
export type GeofencesLazyQueryHookResult = ReturnType<typeof useGeofencesLazyQuery>;
