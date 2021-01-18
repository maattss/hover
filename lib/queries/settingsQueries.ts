import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($id: String!) {
    users_by_pk(id: $id) {
      id
      name
      bio
    }
  }
`;
