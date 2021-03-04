/* eslint-disable */
import * as Types from '../../types/types';

import { FullFeedFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { FullFeedFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type UnlikeMutationVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  feed_id: Types.Scalars['Int'];
}>;

export type UnlikeMutation = { readonly __typename: 'mutation_root' } & {
  readonly delete_likes_by_pk?: Types.Maybe<
    { readonly __typename: 'likes' } & { readonly feed: { readonly __typename: 'feed' } & FullFeedFragmentFragment }
  >;
};

export const UnlikeDocument = gql`
  mutation Unlike($user_id: String!, $feed_id: Int!) {
    delete_likes_by_pk(feed_id: $feed_id, user_id: $user_id) {
      feed {
        ...fullFeedFragment
      }
    }
  }
  ${FullFeedFragmentFragmentDoc}
`;

/**
 * __useUnlikeMutation__
 *
 * To run a mutation, you first call `useUnlikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikeMutation, { data, loading, error }] = useUnlikeMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      feed_id: // value for 'feed_id'
 *   },
 * });
 */
export function useUnlikeMutation(baseOptions?: Apollo.MutationHookOptions<UnlikeMutation, UnlikeMutationVariables>) {
  return Apollo.useMutation<UnlikeMutation, UnlikeMutationVariables>(UnlikeDocument, baseOptions);
}
export type UnlikeMutationHookResult = ReturnType<typeof useUnlikeMutation>;
