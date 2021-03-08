import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Modal, FlatList, Alert, Image } from 'react-native';
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

const getReactionText = (reactionCount: number, userReacted: boolean) => {
  if (reactionCount === 0) return 'Be the first to react to this activity!';
  if (reactionCount === 1 && userReacted) return 'You reacted to this activity.';
  if (reactionCount === 1 && !userReacted) return '1 user reacted to this activity.';
  if (userReacted) return 'You and ' + (reactionCount - 1) + ' users reacted to this activity.';
  return reactionCount + ' users reacted to this activity.';
};
const getImageURI = (userReacted: boolean) => {
  if (userReacted) return require('../../assets/images/clap.png');
  return require('../../assets/images/clap-gray.gif');
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
  const showInfoPopup = () => Alert.alert('Likes', 'These people have reacted to this post!');
  const openModal = () => setModalVisible(true);
  const renderItem = (like: LikesFragmentFragment) => {
    const getName = () => {
      if (auth.user?.uid === like.user.id) return 'You';
      return like.user.name;
    };

    return (
      <TouchableProfile user_id={like.user.id} name={like.user.name} onPress={() => setModalVisible(false)}>
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
        <Image source={{ uri: Asset.fromModule(getImageURI(userReacted)).uri }} style={styles.reactionIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openModal} disabled={isDisabled}>
        <Text style={styles.reactionText}>{getReactionText(reactionCount, userReacted)}</Text>
      </TouchableOpacity>
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.header}>
                <View style={styles.headerleft}>
                  <Text style={styles.headerText}>Liked by</Text>
                  <TouchableOpacity style={styles.infoIcon} onPress={showInfoPopup}>
                    <FAIcon name={'info-circle'} style={styles.icon} />
                  </TouchableOpacity>
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
    height: 40,
    width: 40,
  },
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: Spacing.smaller,
  },
  reactionText: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    paddingVertical: Spacing.large,
    marginLeft: Spacing.base,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: Colors.almostBlackTransparent,
  },
  modalView: {
    margin: Spacing.base,
    backgroundColor: Colors.gray900,
    borderRadius: 10,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    ...Typography.headerText,
  },
  headerleft: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.smallest,
  },
  nameText: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Typography.bodyText,
  },
  avatar: {
    marginRight: Spacing.small,
  },
  infoIcon: {
    ...Typography.smallIcon,
    marginHorizontal: Spacing.smaller,
  },
  exitIcon: {
    ...Typography.smallIcon,

    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  icon: {
    ...Typography.icon,
    textAlign: 'center',
  },
});

export default Reaction;
