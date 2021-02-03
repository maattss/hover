/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type AcceptChallengeParticipationMutationVariables = Types.Exact<{
  challenge_id: Types.Scalars['Int'];
  user_id: Types.Scalars['String'];
}>;

export type AcceptChallengeParticipationMutation = { readonly __typename: 'mutation_root' } & {
  readonly update_challenge_participant_by_pk?: Types.Maybe<
    { readonly __typename: 'challenge_participant' } & Pick<Types.Challenge_Participant, 'accepted'>
  >;
};

export const AcceptChallengeParticipationDocument = gql`
  mutation AcceptChallengeParticipation($challenge_id: Int!, $user_id: String!) {
    update_challenge_participant_by_pk(
      pk_columns: { challenge_id: $challenge_id, user_id: $user_id }
      _set: { accepted: false }
    ) {
      accepted
    }
  }
`;

/**
 * __useAcceptChallengeParticipationMutation__
 *
 * To run a mutation, you first call `useAcceptChallengeParticipationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptChallengeParticipationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptChallengeParticipationMutation, { data, loading, error }] = useAcceptChallengeParticipationMutation({
 *   variables: {
 *      challenge_id: // value for 'challenge_id'
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useAcceptChallengeParticipationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptChallengeParticipationMutation,
    AcceptChallengeParticipationMutationVariables
  >,
) {
  return Apollo.useMutation<AcceptChallengeParticipationMutation, AcceptChallengeParticipationMutationVariables>(
    AcceptChallengeParticipationDocument,
    baseOptions,
  );
}
export type AcceptChallengeParticipationMutationHookResult = ReturnType<typeof useAcceptChallengeParticipationMutation>;
