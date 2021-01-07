import { gql } from '@apollo/client';

// We pass the user id and fetch the name
export const GET_USER = gql`
  query($id: String!) {
    users_by_pk(id: $id) {
      id
      name
      bio
    }
  }
`;

// We pass the user id and the name in order to update it
export const UPDATE_USER_NAME = gql`
  mutation($id: String!, $name: String!, $bio: String) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name, bio: $bio }) {
      id
      name
      bio
    }
  }
`;
