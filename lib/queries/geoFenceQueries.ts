import { gql } from '@apollo/client';

// TODO: Update
export const GET_GEOFENCES = gql`
  query($id: String!) {
    users_by_pk(id: $id) {
      id
      name
      bio
    }
  }
`;
