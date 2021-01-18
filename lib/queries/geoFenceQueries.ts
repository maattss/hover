import { gql } from '@apollo/client';

export const GET_GEOFENCES = gql`
  query getGeofences {
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
