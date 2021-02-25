import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';
import CustomButton from '../../components/general/Button';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { gray900 } from '../../theme/colors';
import { useUpdateFriendTrackingMutation } from '../../graphql/mutations/UpdateFriendTracking.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { useInsertFriendTrackingMutation } from '../../graphql/mutations/InserFriendTracking.generated';
import { useGetFriendTrackingLazyQuery } from '../../graphql/queries/GetFriendTracking.generated';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { Avatar } from 'react-native-elements';
import { ListUserFragmentFragment } from '../../graphql/Fragments.generated';
import { getCurrentTimestamp } from '../../helpers/dateTimeHelpers';
import { useInterval } from '../../hooks/useInterval';

enum HoverWithFriendState {
  NONE,
  STARTING,
  JOINING,
  ONGOING,
}

const wordConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: ' ',
  style: 'upperCase',
  length: 2,
};

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const auth = useAuthentication();

  const stopTracking = () => tracking.pauseTracking();
  const score = Math.floor(tracking.score);
  const progress = tracking.score - score;
  const nextScore = tracking.score == 0 ? 1 : Math.ceil(tracking.score);
  const [yourCollabCode] = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [trackingWithFriendId, setTrackingWithFriendId] = useState<number | undefined>();
  const [friend, setFriend] = useState<ListUserFragmentFragment>();
  const [collabState, setCollabState] = useState<HoverWithFriendState>(HoverWithFriendState.NONE);
  const [collabInfoHidden, setCollabInfoHidden] = useState(false);

  const [UpdateFriendTracking] = useUpdateFriendTrackingMutation();
  const [InsertFriendTracking] = useInsertFriendTrackingMutation();
  const [getFriend, { data: data, error: error }] = useGetFriendTrackingLazyQuery({ fetchPolicy: 'network-only' });

  useEffect(() => {
    const friend = data?.friend_tracking[0].user_join;
    if (friend) updateFriendData(friend);

    if (error) console.error(error.message);
  }, [data, error]);

  // Refresh friend data every 5 seconds if session is STARTING
  useInterval(() => refreshFriendData(), collabState === HoverWithFriendState.STARTING ? 5000 : null);

  const showInfoPopup = () =>
    Alert.alert(
      'Hover together with a friend and earn 2x points!',
      'Start a session to get a code you can share, or ' + 'join a friends by entering their code.',
    );

  const updateFriendData = (friend: ListUserFragmentFragment) => {
    setFriend(friend);
    tracking.setFriendId(friend.id);
    tracking.updateDoubleScore(true);
    setCollabState(HoverWithFriendState.ONGOING);
  };

  const refreshFriendData = () => {
    console.log('REfresh friend data');
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
      if (!trackingWithFriendId) {
        const response = await InsertFriendTracking({
          variables: {
            user_id: auth.user?.uid ?? '',
            linking_word: yourCollabCode,
            geofence_id: tracking.insideGeoFence?.id ?? 0,
          },
        });
        setTrackingWithFriendId(response.data?.insert_friend_tracking_one?.id);
      }
      setCollabState(HoverWithFriendState.STARTING);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert('Something went wrong...');
    }
  };

  const joinFriendTracking = async () => {
    try {
      if (!tracking.insideGeoFence) throw Error('User not inside geofence.');

      const response = await UpdateFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: friendCollabCode,
          timestamp: getCurrentTimestamp(),
          geofence_id: tracking.insideGeoFence.id,
        },
      });

      const friend = response.data?.update_friend_tracking?.returning[0].user_start;
      if (!friend) throw Error('Mutation did not return a response.');
      updateFriendData(friend);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert(
        'Something went wrong...',
        'Make sure that you have entered the correct code and that you are at the same location as your friend. ' +
          'Also you cannot join a session where someone already has joined',
      );
    }
  };

  return (
    <>
      <HoverMap />

      <View style={styles.infoContainer}>
        {!collabInfoHidden && (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.collabInfo}>
              {collabState === HoverWithFriendState.NONE && !collabInfoHidden && (
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
                    <CustomButton
                      style={styles.collabButton}
                      onPress={() => setCollabState(HoverWithFriendState.JOINING)}>
                      Join friend
                    </CustomButton>
                  </View>
                </>
              )}

              {collabState === HoverWithFriendState.STARTING && !collabInfoHidden && (
                <>
                  <View style={styles.rowFlexSpaceBetween}>
                    <Button title={'Back'} onPress={() => setCollabState(HoverWithFriendState.NONE)} />
                    <TouchableOpacity onPress={refreshFriendData} style={styles.iconButton}>
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

                  <Text style={styles.label}>Your friend&apos;s hover code</Text>
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

              {collabState === HoverWithFriendState.ONGOING && !collabInfoHidden && (
                <View style={{ marginHorizontal: Spacing.smaller }}>
                  <View style={styles.rowFlexSpaceBetween}>
                    <Text style={{ ...Typography.xlBodyText }}>Hover with friend</Text>
                    <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
                      <FAIcon name={'chevron-down'} style={styles.icon} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.collabSubHeader}>Earning 2x points together with: </Text>
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
          </TouchableWithoutFeedback>
        )}

        {collabInfoHidden && (
          <View style={styles.rowFlexJustifyEnd}>
            <View style={styles.collabShowContainer}>
              <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
                <FAIcon name={'chevron-up'} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.trackingInfo}>
          <View style={styles.trackingInfoTopBar}>
            {collabState === HoverWithFriendState.ONGOING && (
              <View style={styles.collabIcon}>
                <Text style={styles.collabIconText}>2x points</Text>
              </View>
            )}
            <View>
              <Text style={styles.trackingHeader}>Tracking...</Text>
            </View>
          </View>
          <View style={styles.progressBarLabels}>
            <Text style={styles.label}>Points</Text>
            <View style={{ width: 240 }} />
            <Text style={styles.label}>Next</Text>
          </View>

          <View style={styles.progressBar}>
            <Text style={styles.scoreText}>{score}</Text>
            <Progress.Bar
              progress={progress}
              width={200}
              height={24}
              borderColor={Colors.blue}
              color={Colors.blue}
              borderWidth={1.5}
            />
            <Text style={styles.scoreText}>{nextScore}</Text>
          </View>

          <View style={styles.stopButtonContainer}>
            <TouchableOpacity style={styles.stopButton} onPress={stopTracking}>
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
            <View />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Common
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

  // Specific
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '98%',
    margin: Spacing.smallest,
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
    backgroundColor: gray900,
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
    marginLeft: -Spacing.smaller,
    marginTop: -Spacing.smallest,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginVertical: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  friendContainer: {
    marginVertical: Spacing.smaller,
  },
  collabFriendName: {
    ...Typography.headerText,
    fontSize: 25,
    margin: Spacing.small,
  },
  collabShowContainer: {
    paddingHorizontal: Spacing.smaller,
    paddingVertical: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  trackingInfo: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: Spacing.smaller,
    marginTop: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  trackingInfoTopBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.smaller,
  },
  collabIcon: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.gray900,
    height: '75%',
    borderColor: Colors.gold,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
    marginLeft: -Spacing.extraLarge,
    marginRight: Spacing.base,
  },
  collabIconText: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  trackingHeader: {
    ...Typography.headerText,
    marginVertical: Spacing.smaller,
  },
  progressBarLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scoreText: {
    ...Typography.headerText,
    marginVertical: Spacing.small,
    marginHorizontal: Spacing.largest,
  },
  stopButtonContainer: {
    justifyContent: 'center',
    width: '100%',
  },
  stopButton: {
    ...Buttons.button,
    justifyContent: 'center',
    backgroundColor: Colors.redTransparent,
  },
  stopButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default TrackingScreen;
