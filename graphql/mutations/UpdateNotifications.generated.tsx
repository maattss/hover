/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UpdateNotificationsMutationVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
}>;

export type UpdateNotificationsMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_notifications?: Types.Maybe<
    { readonly __typename: 'notifications_mutation_response' } & {
      readonly returning: ReadonlyArray<
        { readonly __typename: 'notifications' } & Pick<Types.Notifications, 'id' | 'seen'>
      >;
    }
  >;
};

export const UpdateNotificationsDocument = gql`
  mutation UpdateNotifications($user_id: String!) {
    update_notifications(_set: { seen: true }, where: { user_id: { _eq: $user_id } }) {
      returning {
        id
        seen
      }
    }
  }
`;

/**
 * __useUpdateNotificationsMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationsMutation, { data, loading, error }] = useUpdateNotificationsMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useUpdateNotificationsMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateNotificationsMutation, UpdateNotificationsMutationVariables>,
) {
  return Apollo.useMutation<UpdateNotificationsMutation, UpdateNotificationsMutationVariables>(
    UpdateNotificationsDocument,
    baseOptions,
  );
}
export type UpdateNotificationsMutationHookResult = ReturnType<typeof useUpdateNotificationsMutation>;
