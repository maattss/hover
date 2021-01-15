import { gql } from '@apollo/client';

export const GET_GEOFENCES = gql`
  query geofenceQuery {
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
