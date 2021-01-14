import { gql } from '@apollo/client';

export const GET_GEOFENCES = gql`
  query($id: String!) {
    geofences {
      category
      coordinates
      latitude
      longitude
      radius
      variant
    }
  }
`;
