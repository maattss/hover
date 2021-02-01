/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type DeleteChallengeParticipationMutationVariables = Types.Exact<{
  challenge_id: Types.Scalars['Int'];
  user_id: Types.Scalars['String'];
}>;

export type DeleteChallengeParticipationMutation = { readonly __typename: 'mutation_root' } & {
  readonly delete_challenge_participant_by_pk?: Types.Maybe<
    { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'challenge_id' | 'user_id'>
  >;
};

export const DeleteChallengeParticipationDocument = gql`
  mutation DeleteChallengeParticipation($challenge_id: Int!, $user_id: String!) {
    delete_challenge_participant_by_pk(challenge_id: $challenge_id, user_id: $user_id) {
      challenge_id
      user_id
    }
  }
`;

/**
 * __useDeleteChallengeParticipationMutation__
 *
 * To run a mutation, you first call `useDeleteChallengeParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChallengeParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChallengeParticipationMutation, { data, loading, error }] = useDeleteChallengeParticipationMutation({
 *   variables: {
 *      challenge_id: // value for 'challenge_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useDeleteChallengeParticipationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteChallengeParticipationMutation,
    DeleteChallengeParticipationMutationVariables
  >,
) {
  return Apollo.useMutation<DeleteChallengeParticipationMutation, DeleteChallengeParticipationMutationVariables>(
    DeleteChallengeParticipationDocument,
    baseOptions,
  );
}
export type DeleteChallengeParticipationMutationHookResult = ReturnType<typeof useDeleteChallengeParticipationMutation>;
