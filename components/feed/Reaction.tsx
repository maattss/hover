import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Image } from 'react-native';
import { Typography, Spacing } from '../../theme';
import { Asset } from 'expo-asset';
import { LikesFragmentFragment } from '../../graphql/Fragments.generated';
import { useLikeMutation } from '../../graphql/mutations/Like.generated';
import { useUnlikeMutation } from '../../graphql/mutations/Unlike.generated';
import { Colors } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { Avatar } from 'react-native-elements';
import { defaultUserProfile } from '../../helpers/objectMappers';
import TouchableProfile from '../general/TouchableProfile';
import useAuthentication from '../../hooks/useAuthentication';
import * as Analytics from 'expo-firebase-analytics';

const getReactionText = (reactionCount: number, userReacted: boolean) => {
  if (reactionCount === 0) return 'Be the first to react to this activity!';
  if (reactionCount === 1 && userReacted) return 'You reacted to this activity.';
  if (reactionCount === 1 && !userReacted) return '1 other user reacted to this activity.';
  if (reactionCount === 2 && userReacted) return 'You and 1 other user reacted to this activity.';
  if (userReacted) return 'You and ' + (reactionCount - 1) + ' other users reacted to this activity.';
  return reactionCount + ' users reacted to this activity.';
};
type ReactionProps = {
  feed_id: number;
  user_id: string;
  likes: readonly LikesFragmentFragment[];
};

const Reaction: React.FC<ReactionProps> = (props: ReactionProps) => {
  const isLiked = (likes: readonly LikesFragmentFragment[]) => {
    return likes?.find((like) => like.user.id === props.user_id) ? true : false;
  };

  const [reactionCount, setReactionCount] = useState<number>(props.likes?.length ?? 0);
  const [likedBy, setLikedBy] = useState<readonly LikesFragmentFragment[]>();
  const [userReacted, setUserReacted] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>();
  const [isDisabled, setDisabled] = useState<boolean>();

  const [like] = useLikeMutation({ variables: { user_id: props.user_id, feed_id: props.feed_id } });
  const [unlike] = useUnlikeMutation({ variables: { user_id: props.user_id, feed_id: props.feed_id } });

  useEffect(() => {
    updateLikes(props.likes);
  }, []);

  const updateLikes = (newLikes: readonly LikesFragmentFragment[]) => {
    setUserReacted(isLiked(newLikes));
    setLikedBy(newLikes);
    setReactionCount(newLikes?.length);
    setDisabled(newLikes?.length == 0 ?? true);
  };
  const auth = useAuthentication();
  const reactToActivity = () => {
    if (!userReacted) {
      setReactionCount(reactionCount + 1);
      setUserReacted(true);
      like()
        .then((response) => {
          if (response.data?.insert_likes_one?.feed) {
            updateLikes(response.data.insert_likes_one.feed.likes);
          }
        })
        .catch((reason) => {
          console.log('Error:', reason);
          setReactionCount(reactionCount);
          setUserReacted(false);
        });
    } else {
      setReactionCount(reactionCount - 1);
      setUserReacted(false);
      unlike()
        .then((response) => {
          if (response.data?.delete_likes_by_pk?.feed) {
            updateLikes(response.data?.delete_likes_by_pk?.feed.likes);
          }
        })
        .catch((reason) => {
          console.log('Error:', reason);
          setReactionCount(reactionCount);
          setUserReacted(true);
        });
    }
  };
  const openModal = () => setModalVisible(true);
  const renderItem = (like: LikesFragmentFragment) => {
    const getName = () => {
      if (auth.user?.uid === like.user.id) return 'You';
      return like.user.name;
    };

    return (
      <TouchableProfile
        user_id={like.user.id}
        name={like.user.name}
        onPress={() => {
          setModalVisible(false);
          Analytics.logEvent('visit_profile', {
            navigateFrom: 'FeedScreen',
            user: like.user.id,
            navigateTo: 'ProfileScreen',
            purpose: 'Viewing more info on a user',
          });
        }}>
        <View style={styles.row}>
          <View style={styles.avatar}>
            <Avatar rounded source={{ uri: like.user.picture ?? defaultUserProfile.picture }} size="small" />
          </View>
          <Text style={styles.nameText}>{getName()}</Text>
        </View>
      </TouchableProfile>
    );
  };

  return (
    <View style={styles.reactionContainer}>
      <TouchableOpacity onPress={reactToActivity}>
        {userReacted && (
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={{ uri: Asset.fromModule(require('../../assets/images/reactionIcons/clap.png')).uri }}
            style={styles.reactionIcon}
          />
        )}
        {!userReacted && (
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={{ uri: Asset.fromModule(require('../../assets/images/reactionIcons/clap-gray.gif')).uri }}
            style={styles.reactionIcon}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={openModal} disabled={isDisabled}>
        <Text style={styles.reactionText} numberOfLines={1}>
          {getReactionText(reactionCount, userReacted)}
        </Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <View style={styles.headerleft}>
                  <Text style={styles.headerText}>Reactions</Text>
                </View>
                <TouchableOpacity style={styles.exitIcon} onPress={() => setModalVisible(!modalVisible)}>
                  <FAIcon name={'times'} style={styles.icon} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={likedBy}
                keyExtractor={(item) => item.user.id}
                renderItem={({ item }) => renderItem(item)}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reactionIcon: {
    padding: Spacing.base,
    height: 35,
    width: 35,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Spacing.smaller,
    marginTop: Spacing.smallest,
  },
  reactionText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    paddingVertical: Spacing.base,
    marginLeft: Spacing.base,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.almostBlackTransparent,
  },
  modalView: {
    backgroundColor: Colors.gray900,
    borderRadius: 10,
    width: '90%',
    padding: Spacing.smallest,
    paddingBottom: Spacing.smaller,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: Spacing.small,
  },
  headerText: {
    ...Typography.headerText,
  },
  headerleft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.smallest,
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.smaller,
  },
  nameText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
  },
  avatar: {
    marginRight: Spacing.small,
  },
  exitIcon: {
    padding: Spacing.small,
  },
  icon: {
    ...Typography.icon,
    textAlign: 'center',
  },
});

export default Reaction;
