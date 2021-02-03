/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type UpdateChallengeParticipationMutationVariables = Types.Exact<{
  challenge_id: Types.Scalars['Int'];
  user_id: Types.Scalars['String'];
  state: Types.Challenge_Participant_State_Enum;
}>;

export type UpdateChallengeParticipationMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_challenge_participant_by_pk?: Types.Maybe<
    { readonly __typename: 'challenge_participant' } & Pick<
      Types.Challenge_Participant,
      'state' | 'challenge_id' | 'user_id'
    >
  >;
};

export const UpdateChallengeParticipationDocument = gql`
  mutation UpdateChallengeParticipation(
    $challenge_id: Int!
    $user_id: String!
    $state: challenge_participant_state_enum!
  ) {
    update_challenge_participant_by_pk(
      pk_columns: { challenge_id: $challenge_id, user_id: $user_id }
      _set: { state: $state }
    ) {
      state
      challenge_id
      user_id
    }
  }
`;

/**
 * __useUpdateChallengeParticipationMutation__
 *
 * To run a mutation, you first call `useUpdateChallengeParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChallengeParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChallengeParticipationMutation, { data, loading, error }] = useUpdateChallengeParticipationMutation({
 *   variables: {
 *      challenge_id: // value for 'challenge_id'
 *      user_id: // value for 'user_id'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useUpdateChallengeParticipationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateChallengeParticipationMutation,
    UpdateChallengeParticipationMutationVariables
  >,
) {
  return Apollo.useMutation<UpdateChallengeParticipationMutation, UpdateChallengeParticipationMutationVariables>(
    UpdateChallengeParticipationDocument,
    baseOptions,
  );
}
export type UpdateChallengeParticipationMutationHookResult = ReturnType<typeof useUpdateChallengeParticipationMutation>;
