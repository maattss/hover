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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
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
import moment from 'moment';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { Avatar } from 'react-native-elements';
import Divider from '../../components/general/Divider';

const wordConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: ' ',
  style: 'upperCase',
  length: 2,
};

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const auth = useAuthentication();
  const [join, setJoin] = useState(false);
  const [start, setStart] = useState(false);
  const stopTracking = () => tracking.pauseTracking();
  const score = Math.floor(tracking.score);
  const progress = tracking.score - score;
  const nextScore = tracking.score == 0 ? 1 : Math.ceil(tracking.score);
  const [yourCollabCode] = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [trackingWithFriendId, setTrackingWithFriendId] = useState<number | undefined>();
  const [friendName, setFriendName] = useState('');
  const [friendPicture, setFriendPicture] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [collabInfoHidden, setCollabInfoHidden] = useState(false);

  const [UpdateFriendTracking] = useUpdateFriendTrackingMutation();
  const [InsertFriendTracking] = useInsertFriendTrackingMutation();

  const [getFriend, { data: data, error: error }] = useGetFriendTrackingLazyQuery({ fetchPolicy: 'network-only' });

  useEffect(() => {
    const friend = data?.friend_tracking[0].user_join;
    if (friend) {
      setFriendName(friend.name);
      setFriendPicture(friend.picture ?? '');
      tracking.updateDoubleScore(true);
      setIsEnabled(true);
    }
    if (error) console.error(error.message);
  }, [data, error]);

  const showInfoPopup = () =>
    Alert.alert(
      'Hover together with a friend and earn 2x points!',
      'Start a session to get a code you can share, or ' + 'join a friends by entering their code.',
    );

  const refreshData = () => {
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
      setStart(true);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert('Something went wrong...');
    }
  };

  const joinFriendTracking = async () => {
    try {
      const response = await UpdateFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: friendCollabCode,
          date: moment(Date.now()).format('YYYY-MM-DD'),
          geofence_id: tracking.insideGeoFence?.id ?? 0,
        },
      });

      const friend = response.data?.update_friend_tracking?.returning[0].user_start;
      if (friend) {
        setFriendName(friend.name);
        setFriendPicture(friend.picture ?? defaultUserProfile.picture);
      }
      setJoin(false);
      setIsEnabled(true);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert(
        'Something went wrong...',
        'Make sure that you have entered the correct code and that you are at the same location as your friend',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <HoverMap />
      </View>

      <KeyboardAvoidingView style={styles.infoContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {!collabInfoHidden && (
              <View style={styles.collabInfo}>
                {join && !isEnabled && !collabInfoHidden && (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingBottom: Spacing.small,
                      }}>
                      <View style={{ marginLeft: -Spacing.smaller, marginTop: -Spacing.smallest }}>
                        <Button title={'Back'} onPress={() => setJoin(false)} />
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
                {start && !isEnabled && (
                  <>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Button title={'Back'} onPress={() => setStart(false)} />
                      <TouchableOpacity onPress={refreshData} style={styles.iconButton}>
                        <FAIcon name={'sync'} style={styles.iconBlue} />
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                      <ActivityIndicator />
                      <Text style={styles.waitingForFriendLabel}>Waiting for friend to join...</Text>
                    </View>

                    <View style={styles.collabCodeContainer}>
                      <Text style={styles.collabCode}>{yourCollabCode}</Text>
                    </View>
                  </>
                )}

                {!join && !start && !isEnabled && !collabInfoHidden && (
                  <>
                    <View style={styles.collabTopBar}>
                      <View>
                        <Text style={styles.collabHeader}>Hover with friend</Text>
                        <Text style={styles.collabSubHeader}>Get started to earn 2x points!</Text>
                      </View>
                      <TouchableOpacity onPress={showInfoPopup}>
                        <FAIcon name={'info-circle'} style={styles.icon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
                        <FAIcon name={'chevron-down'} style={styles.icon} />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.collabButtonsContainer}>
                      <CustomButton style={styles.collabButton} onPress={startFriendTracking}>
                        Start session
                      </CustomButton>
                      <CustomButton style={styles.collabButton} onPress={() => setJoin(true)}>
                        Join friend
                      </CustomButton>
                    </View>
                  </>
                )}
                {isEnabled && (
                  <View style={{ marginHorizontal: Spacing.smaller }}>
                    <Text style={styles.collabHeader}>Hover with friend</Text>
                    <View>
                      <Text style={styles.collabSubHeader}>Earning 2x points together with</Text>
                      <View
                        style={{ flexDirection: 'row', justifyContent: 'flex-start', marginVertical: Spacing.small }}>
                        <Avatar
                          rounded
                          source={{ uri: friendPicture ? friendPicture : defaultUserProfile.picture }}
                          size="medium"
                        />
                        <Text style={styles.nameText}>{friendName ? friendName : 'Unknown'}</Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>
            )}

            {collabInfoHidden && (
              <View style={styles.collabHidden}>
                <View style={styles.collabShowContainer}>
                  <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
                    <FAIcon name={'chevron-up'} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.trackingInfo}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  paddingHorizontal: Spacing.small,
                }}>
                {isEnabled && (
                  <View
                    style={{
                      borderStyle: 'solid',
                      borderWidth: 1,
                      backgroundColor: Colors.gray900,
                      borderColor: Colors.gold,
                      width: 70,
                      height: 70,
                      borderRadius: 70 / 2,
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        ...Typography.largeBodyText,
                        fontWeight: 'bold',
                        color: Colors.gold,
                        textAlign: 'center',
                        paddingTop: Spacing.smaller,
                      }}>
                      2x points
                    </Text>
                  </View>
                )}
                <Text style={[styles.headerText, { lineHeight: 60 }]}>Tracking...</Text>
              </View>
              <View style={styles.progressBarLabels}>
                <Text style={styles.label}>Points</Text>
                <View style={{ marginHorizontal: 100 }} />
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  mapContainer: {},
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '98%',
    margin: Spacing.smallest,
    justifyContent: 'flex-end',
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
  collabHeader: {
    ...Typography.xlBodyText,
  },
  collabSubHeader: {
    ...Typography.largeBodyText,
    marginTop: Spacing.smallest,
    fontStyle: 'italic',
  },
  collabCode: {
    ...Typography.xlBodyText,
    textAlign: 'center',
    paddingVertical: Spacing.smaller,
  },
  collabCodeContainer: {
    marginVertical: Spacing.smaller,
    borderRadius: Spacing.smaller,
    backgroundColor: gray900,
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
  collabHidden: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  collabShowContainer: {
    paddingHorizontal: Spacing.smaller,
    paddingVertical: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
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
  trackingInfo: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: Spacing.smaller,
    marginTop: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerText: {
    ...Typography.headerText,
    marginVertical: Spacing.smaller,
  },
  scoreText: {
    ...Typography.headerText,
    marginVertical: Spacing.small,
  },
  mh100: {
    marginHorizontal: 100,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  progressBarLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '97%',
    paddingHorizontal: Spacing.base,
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
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginVertical: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  waitingForFriendLabel: {
    ...Typography.largeBodyText,
    marginTop: Spacing.small,
    textAlign: 'center',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 50,
    marginLeft: Spacing.small,
  },
});

export default TrackingScreen;
