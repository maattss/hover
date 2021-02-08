/* eslint-disable */
import * as Types from '../../types/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type InsertChallengeMutationVariables = Types.Exact<{
  challenge_type: Types.Challenge_Type_Enum;
  end_date: Types.Scalars['date'];
  participants: ReadonlyArray<Types.Challenge_Participant_Insert_Input> | Types.Challenge_Participant_Insert_Input;
  created_by: Types.Scalars['String'];
}>;

export type InsertChallengeMutation = { readonly __typename: 'mutation_root' } & {
  readonly insert_challenge_one?: Types.Maybe<
    { readonly __typename: 'challenge' } & Pick<
      Types.Challenge,
      'id' | 'challenge_type' | 'start_date' | 'end_date' | 'state' | 'rules' | 'created_by'
    > & {
        readonly challenge_participants: ReadonlyArray<
          { readonly __typename: 'challenge_participant' } & {
            readonly user: { readonly __typename: 'users' } & Pick<Types.Users, 'id'>;
          }
        >;
      }
  >;
};

export const InsertChallengeDocument = gql`
  mutation InsertChallenge(
    $challenge_type: challenge_type_enum!
    $end_date: date!
    $participants: [challenge_participant_insert_input!]!
    $created_by: String!
  ) {
    insert_challenge_one(
      object: {
        end_date: $end_date
        challenge_participants: { data: $participants }
        challenge_type: $challenge_type
        created_by: $created_by
      }
    ) {
      id
      challenge_type
      start_date
      end_date
      state
      rules
      challenge_participants {
        user {
          id
        }
      }
      created_by
    }
  }
`;

/**
 * __useInsertChallengeMutation__
 *
 * To run a mutation, you first call `useInsertChallengeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertChallengeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertChallengeMutation, { data, loading, error }] = useInsertChallengeMutation({
 *   variables: {
 *      challenge_type: // value for 'challenge_type'
 *      end_date: // value for 'end_date'
 *      participants: // value for 'participants'
 *      created_by: // value for 'created_by'
 *   },
 * });
 */
export function useInsertChallengeMutation(
  baseOptions?: Apollo.MutationHookOptions<InsertChallengeMutation, InsertChallengeMutationVariables>,
) {
  return Apollo.useMutation<InsertChallengeMutation, InsertChallengeMutationVariables>(
    InsertChallengeDocument,
    baseOptions,
  );
}
export type InsertChallengeMutationHookResult = ReturnType<typeof useInsertChallengeMutation>;
