import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import useTracking from '../../hooks/useTracking';
import CustomButton from '../general/Button';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { useUpdateFriendTrackingMutation } from '../../graphql/mutations/UpdateFriendTracking.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { useInsertFriendTrackingMutation } from '../../graphql/mutations/InserFriendTracking.generated';
import { useGetFriendTrackingLazyQuery } from '../../graphql/queries/GetFriendTracking.generated';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { Avatar } from 'react-native-elements';
import { ListUserFragmentFragment } from '../../graphql/Fragments.generated';
import { getCurrentTimestamp } from '../../helpers/dateTimeHelpers';
import { useInterval } from '../../hooks/useInterval';
import { HoverWithFriendState } from '../../types/hoverWithFriendsType';
import { readTrackingInfo } from '../../helpers/storage';

const wordConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: ' ',
  style: 'upperCase',
  length: 2,
};
interface Props {
  collabState: HoverWithFriendState;
  setCollabState: React.Dispatch<React.SetStateAction<HoverWithFriendState>>;
  collabInfoHidden: boolean;
  setCollabInfoHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

const HoverWithFriends: React.FC<Props> = ({
  collabState,
  setCollabState,
  collabInfoHidden,
  setCollabInfoHidden,
}: Props) => {
  const tracking = useTracking();
  const auth = useAuthentication();
  const [yourCollabCode] = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [trackingWithFriendId, setTrackingWithFriendId] = useState(0);
  const [friend, setFriend] = useState<ListUserFragmentFragment>();
  const [UpdateFriendTracking] = useUpdateFriendTrackingMutation();
  const [InsertFriendTracking] = useInsertFriendTrackingMutation();
  const [getFriend, { data: data, error: error }] = useGetFriendTrackingLazyQuery({ fetchPolicy: 'network-only' });

  useEffect(() => {
    // Restore friend session if app crashed
    const init = async () => {
      const trackingInfo = await readTrackingInfo();
      console.log('Checking if hover with friends was used');
      if (trackingInfo.friendId !== '' && trackingInfo.trackingWithFriendId !== 0) {
        console.log('Init friend id', trackingInfo.friendId);
        console.log('Init tracking with friend id', trackingInfo.trackingWithFriendId);
        tracking.updateFriend(trackingInfo.friendId, trackingInfo.trackingWithFriendId);
        getFriend({
          variables: {
            id: trackingInfo.trackingWithFriendId,
          },
        });
        setCollabState(HoverWithFriendState.ONGOING);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const friend = data?.friend_tracking[0].user_join;
    const id = data?.friend_tracking[0].id;
    if (friend && id) {
      setFriend(friend);
      setTrackingWithFriendId(id);
      tracking.updateFriend(friend.id, id);
      setCollabState(HoverWithFriendState.ONGOING);
    }

    if (error) console.error(error.message);
  }, [data, error]);

  // Refresh friend data every 5 seconds if session is STARTING
  useInterval(
    () => refreshFriendData(trackingWithFriendId),
    collabState === HoverWithFriendState.STARTING ? 5000 : null,
  );

  const showInfoPopup = () =>
    Alert.alert(
      'Hover together with a friend and earn 2x points!',
      'Start a session to get a code you can share, or ' + 'join a friends by entering their code.',
    );

  const refreshFriendData = (trackingWithFriendId: number | undefined) => {
    if (trackingWithFriendId) {
      getFriend({
        variables: {
          id: trackingWithFriendId,
        },
      });
    } else {
      console.error('Undefined trackingWithFriendId...');
    }
  };

  const startFriendTracking = async () => {
    try {
      setCollabState(HoverWithFriendState.STARTING);
      if (!trackingWithFriendId) {
        const id = auth.user?.uid ?? '';
        if (id) {
          const response = await InsertFriendTracking({
            variables: {
              user_id: id,
              linking_word: yourCollabCode,
              geofence_id: tracking.trackingGeoFence?.id ?? 0,
            },
          });
          setTrackingWithFriendId(response.data?.insert_friend_tracking_one?.id ?? 0);
        } else {
          throw Error('Error: User id not present');
        }
      }
    } catch (error) {
      setCollabState(HoverWithFriendState.NONE);
      console.error('Mutation error', error.message);
      Alert.alert('Something went wrong...');
    }
  };

  const joinFriendTracking = async () => {
    try {
      if (!tracking.trackingGeoFence) throw Error('User not inside geofence.');

      const response = await UpdateFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: friendCollabCode,
          timestamp: getCurrentTimestamp(),
          geofence_id: tracking.trackingGeoFence.id,
        },
      });

      const friend = response.data?.update_friend_tracking?.returning[0].user_start;
      if (!friend) throw Error('Mutation did not return a response.');
      setFriend(friend);
      tracking.updateFriend(friend.id, trackingWithFriendId);
      setCollabState(HoverWithFriendState.ONGOING);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert(
        'Something went wrong...',
        'Make sure that you have entered the correct code and that you are at the same location as your friend. ' +
          'Also you cannot join a session where someone already has joined.',
      );
    }
  };

  return (
    <View style={styles.collabInfo}>
      {collabState === HoverWithFriendState.NONE && (
        <>
          <View style={styles.collabTopBar}>
            <View>
              <View style={styles.rowFlex}>
                <Text style={{ ...Typography.xlBodyText }}>Hover with friend</Text>
                <TouchableOpacity onPress={showInfoPopup}>
                  <FAIcon name={'info-circle'} style={styles.iconSmall} />
                </TouchableOpacity>
              </View>
              <Text style={styles.collabSubHeader}>Get started to earn 2x points!</Text>
            </View>

            <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
              <FAIcon name={'chevron-down'} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <View style={styles.collabButtonsContainer}>
            <CustomButton style={styles.collabButton} onPress={startFriendTracking}>
              Start session
            </CustomButton>
            <CustomButton style={styles.collabButton} onPress={() => setCollabState(HoverWithFriendState.JOINING)}>
              Join friend
            </CustomButton>
          </View>
        </>
      )}

      {collabState === HoverWithFriendState.STARTING && (
        <>
          <View style={styles.rowFlexSpaceBetween}>
            <Button title={'Back'} onPress={() => setCollabState(HoverWithFriendState.NONE)} />
            <TouchableOpacity onPress={() => refreshFriendData(trackingWithFriendId)} style={styles.iconButton}>
              <FAIcon name={'sync'} style={styles.iconBlue} />
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center' }}>
            <ActivityIndicator />
            <Text style={styles.waitingForFriendLabel}>Waiting for friend to join...</Text>
          </View>

          <View style={styles.collabCodeContainer}>
            <Text style={styles.collabCode}>{yourCollabCode}</Text>
          </View>
        </>
      )}

      {collabState === HoverWithFriendState.JOINING && (
        <>
          <View style={[styles.rowFlexSpaceBetween, { paddingVertical: Spacing.smaller }]}>
            <View style={styles.collabJoiningBack}>
              <Button title={'Back'} onPress={() => setCollabState(HoverWithFriendState.NONE)} />
            </View>

            <TouchableOpacity onPress={showInfoPopup}>
              <FAIcon name={'info-circle'} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.collabJoiningLabel}>Your friend&apos;s hover code</Text>
          <TextInput
            placeholder="Enter code"
            placeholderTextColor={Colors.gray600}
            onChangeText={(val) => setFriendCollabCode(val)}
            style={styles.formField}
            autoCapitalize={'characters'}
            autoCorrect={false}
          />
          <CustomButton onPress={joinFriendTracking}>Join</CustomButton>
        </>
      )}

      {collabState === HoverWithFriendState.ONGOING && (
        <View style={{ marginHorizontal: Spacing.smaller }}>
          <View style={styles.rowFlexSpaceBetween}>
            <Text style={{ ...Typography.xlBodyText }}>Hover with friend</Text>
            <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
              <FAIcon name={'chevron-down'} style={styles.icon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.collabSubHeader}>Earning 2x points together with</Text>
          <View style={styles.friendContainer}>
            <View style={styles.rowFlexJustifyStart}>
              <Avatar
                rounded
                source={{ uri: friend?.picture ? friend.picture : defaultUserProfile.picture }}
                size="medium"
              />
              <Text style={styles.collabFriendName}>{friend ? friend.name : 'Unknown'}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  rowFlex: {
    flexDirection: 'row',
  },
  rowFlexSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowFlexJustifyStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowFlexJustifyEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconSmall: {
    ...Typography.smallIcon,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  icon: {
    ...Typography.icon,
    width: 35,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
  iconBlue: {
    color: Colors.blue,
    fontSize: Typography.largeBodyText.fontSize,
    marginHorizontal: Spacing.smaller,
  },
  iconButton: {
    marginTop: Spacing.smaller,
    marginRight: Spacing.smaller,
  },
  collabInfo: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
  },
  collabTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  collabSubHeader: {
    ...Typography.largeBodyText,
    marginTop: Spacing.smallest,
    fontStyle: 'italic',
  },
  collabButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: Spacing.smaller,
  },
  collabButton: {
    width: '47%',
    padding: Spacing.small,
  },
  collabCodeContainer: {
    marginVertical: Spacing.smaller,
    borderRadius: Spacing.smaller,
    backgroundColor: Colors.gray900,
  },
  waitingForFriendLabel: {
    ...Typography.largeBodyText,
    marginTop: Spacing.small,
    textAlign: 'center',
  },
  collabCode: {
    ...Typography.xlBodyText,
    textAlign: 'center',
    paddingVertical: Spacing.smaller,
  },
  collabJoiningBack: {
    marginLeft: 0,
    marginTop: -Spacing.smallest,
  },
  collabJoiningLabel: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: Spacing.smaller,
  },
  formField: {
    ...Buttons.button,
    ...Typography.xlBodyText,
    padding: Spacing.small,
    marginVertical: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  friendContainer: {
    marginVertical: Spacing.smaller,
  },
  collabFriendName: {
    ...Typography.headerText,
    fontSize: 24,
    fontWeight: 'bold',
    margin: Spacing.small,
  },
});

export default HoverWithFriends;
