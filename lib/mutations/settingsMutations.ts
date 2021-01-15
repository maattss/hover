import { gql } from '@apollo/client';

export const UPDATE_USER_NAME = gql`
  mutation($id: String!, $name: String!, $bio: String) {
    update_users_by_pk(pk_columns: { id: $id }, _set: { name: $name, bio: $bio }) {
      id
      name
      bio
    }
  }
`;
