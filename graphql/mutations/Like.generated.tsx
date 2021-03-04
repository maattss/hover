/* eslint-disable */
import * as Types from '../../types/types';

import { FullFeedFragmentFragment } from '../Fragments.generated';
import { gql } from '@apollo/client';
import { FullFeedFragmentFragmentDoc } from '../Fragments.generated';
import * as Apollo from '@apollo/client';
export type LikeMutationVariables = Types.Exact<{
  user_id: Types.Scalars['String'];
  feed_id: Types.Scalars['Int'];
}>;

export type LikeMutation = { readonly __typename: 'mutation_root' } & {
  readonly insert_likes_one?: Types.Maybe<
    { readonly __typename: 'likes' } & { readonly feed: { readonly __typename: 'feed' } & FullFeedFragmentFragment }
  >;
};

export const LikeDocument = gql`
  mutation like($user_id: String!, $feed_id: Int!) {
    insert_likes_one(object: { feed_id: $feed_id, user_id: $user_id }) {
      feed {
        ...fullFeedFragment
      }
    }
  }
  ${FullFeedFragmentFragmentDoc}
`;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      feed_id: // value for 'feed_id'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
  return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, baseOptions);
}
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
