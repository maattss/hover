import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Typography, Spacing } from '../../theme';
import { Asset } from 'expo-asset';

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
};

const Reaction: React.FC<ReactionProps> = (props: ReactionProps) => {
  const [reactionCount, setReactionCount] = useState(0);
  const [userReacted, setUserReacted] = useState(false);

  const reactToActivity = () => {
    if (!userReacted) {
      setReactionCount(reactionCount + 1);
      setUserReacted(true);
    } else {
      setReactionCount(reactionCount - 1);
      setUserReacted(false);
    }
    // TODO: Insert reaction mutation here
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
