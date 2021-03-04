import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View, Alert, Modal, Pressable } from 'react-native';
import { Typography, Spacing } from '../../theme';
import { Asset } from 'expo-asset';
import {
  LikesFragmentFragment,
  LikesFragmentFragmentDoc,
  ListUserFragmentFragment,
} from '../../graphql/Fragments.generated';
import { useLikeMutation } from '../../graphql/mutations/Like.generated';
import { useUnlikeMutation } from '../../graphql/mutations/Unlike.generated';
import { Colors } from '../../theme';
import Button from '../general/Button';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { defaultUserProfile } from '../../helpers/objectMappers';

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
  const [modalVisible, setModalVisible] = useState(false);

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
  const openModal = () => setModalVisible(true);
  const renderItem = (like: LikesFragmentFragment, index: number) => (
    <View key={index}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Avatar rounded source={{ uri: like.user.picture ?? defaultUserProfile.picture }} size="small" />
        </View>
        <Text style={styles.nameText}>{like.user.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.reactionContainer}>
      <TouchableOpacity onPress={reactToActivity}>
        <Image source={{ uri: Asset.fromModule(getImageURI(userReacted)).uri }} style={styles.reactionIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={openModal}>
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
              <FlatList
                data={props.likes}
                renderItem={({ item, index }) => renderItem(item, index)}
                ListHeaderComponent={<Text style={styles.header}>Likes</Text>}
                ListFooterComponent={
                  <Button style={styles.footer} onPress={() => setModalVisible(!modalVisible)}>
                    Close
                  </Button>
                }
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
    height: 45,
    width: 45,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: Spacing.base,
    backgroundColor: 'white',
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
    width: '80%',
  },
  header: {
    ...Typography.headerText,
    color: Colors.almostBlack,
    marginBottom: Spacing.base,
  },
  footer: {
    marginTop: Spacing.base,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  nameText: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    ...Typography.bodyText,
    color: Colors.almostBlack,
  },
  avatar: {
    marginRight: Spacing.small,
  },
});

export default Reaction;
