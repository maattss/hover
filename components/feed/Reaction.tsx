import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Typography, Spacing } from '../../theme';
import { Asset } from 'expo-asset';
import { LikesFragmentFragment } from '../../graphql/Fragments.generated';
import { useLikeMutation } from '../../graphql/mutations/Like.generated';
import { useUnlikeMutation } from '../../graphql/mutations/Unlike.generated';

const getReactionText = (reactionCount: number, userReacted: boolean) => {
  if (reactionCount === 0) return 'No reactions yet... Tap to be the first!';
  if (reactionCount === 1 && userReacted) return 'You reacted to this activity.';
  if (reactionCount === 1 && !userReacted) return '1 user reacted to this activity.';
  if (userReacted) return 'You and ' + (reactionCount - 1) + ' users reacted to this activity.';
  return reactionCount + ' users reacted to this activity.';
};
const getImageURI = (userReacted: boolean) => {
  if (userReacted) return require('../../assets/images/clap.png');
  return require('../../assets/images/clap-gray.png');
};
type ReactionProps = {
  feed_id: number;
  user_id: string;
  likes: LikesFragmentFragment[];
};

const Reaction: React.FC<ReactionProps> = (props: ReactionProps) => {
  const isLiked = (likes: readonly LikesFragmentFragment[]) => {
    return likes.find((like) => like.user.id === props.user_id) ? true : false;
  };

  const [reactionCount, setReactionCount] = useState(props.likes.length);
  const [userReacted, setUserReacted] = useState(isLiked(props.likes));

  const [like] = useLikeMutation({ variables: { user_id: props.user_id, feed_id: props.feed_id } });
  const [unlike] = useUnlikeMutation({ variables: { user_id: props.user_id, feed_id: props.feed_id } });

  const reactToActivity = () => {
    if (!userReacted) {
      setReactionCount(reactionCount + 1);
      setUserReacted(true);
      like().then((response) => {
        if (response.data?.insert_likes_one?.feed) {
          setUserReacted(isLiked(response.data?.insert_likes_one?.feed.likes));
          setReactionCount(response.data?.insert_likes_one?.feed.likes.length);
        }
      });
    } else {
      setReactionCount(reactionCount - 1);
      setUserReacted(false);
      unlike().then((response) => {
        if (response.data?.delete_likes_by_pk?.feed) {
          setUserReacted(isLiked(response.data?.delete_likes_by_pk?.feed.likes));
          setReactionCount(response.data?.delete_likes_by_pk?.feed.likes.length);
        }
      });
    }
  };

  return (
    <TouchableOpacity onPress={reactToActivity} style={styles.reactionContainer}>
      <Image source={{ uri: Asset.fromModule(getImageURI(userReacted)).uri }} style={styles.reactionIcon} />
      <Text style={styles.reactionText}>{getReactionText(reactionCount, userReacted)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  reactionIcon: {
    height: 30,
    width: 30,
    marginVertical: Spacing.smallest,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Spacing.smaller,
    paddingVertical: Spacing.smallest,
  },
  reactionText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginLeft: Spacing.base,
  },
});

export default Reaction;
