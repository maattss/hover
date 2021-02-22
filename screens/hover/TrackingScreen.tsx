import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, Button, Alert } from 'react-native';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';
import CustomButton from '../../components/general/Button';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { gray900 } from '../../theme/colors';
import Divider from '../../components/general/Divider';
import KeyboardAvoiderNoHeader from '../../components/general/KeyboarAvoiderNoHeader';
import { useUpdateFriendTrackingMutation } from '../../graphql/mutations/UpdateFriendTracking.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { useInsertFriendTrackingMutation } from '../../graphql/mutations/InserFriendTracking.generated';
import {
  useGetFriendTrackingLazyQuery,
  useGetFriendTrackingQuery,
} from '../../graphql/queries/GetFriendTracking.generated';
import { useInterval } from '../../hooks/useInterval';
import moment from 'moment';

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
  const nextScore = () => {
    if (tracking.score == 0 && tracking.doubleScore) return 2;
    if (tracking.score == 0) return 1;
    if (tracking.doubleScore) return Math.ceil(tracking.score + 1);
    return Math.ceil(tracking.score);
  };

  const [yourCollabCode] = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [trackingWithFriendId, setTrackingWithFriendId] = useState<number | undefined>();
  const [friendName, setFriendName] = useState('');
  const [friendPicture, setFriendPicture] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

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
      'Start a session to get a code you can share, or ' + 'join a friends by inserting their code.',
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
      const response = await InsertFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: yourCollabCode,
          geofence_id: tracking.insideGeoFence?.id ?? 0,
        },
      });
      setStart(true);
      setTrackingWithFriendId(response.data?.insert_friend_tracking_one?.id);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert('Something went wrong...');
    }
  };

  const joinFriendTracking = async () => {
    setJoin(false);
    try {
      const response = await UpdateFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: friendCollabCode,
          date: moment(Date.now()).format('YYYY-MM-DD'),
          geofence_id: tracking.insideGeoFence?.id ?? 0,
        },
      });
      console.log('Join response', response);
      setIsEnabled(true);
    } catch (error) {
      console.error('Mutation error', error.message);
      Alert.alert(
        'Something went wrong...',
        'Make sure that you have entered the correct code and at the same location as your friend',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <HoverMap />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.collabInfo}>
          <View style={styles.collabTopBar}>
            <View>
              <Text style={styles.collabHeader}>Hover with friend</Text>
              <Text style={styles.collabSubHeader}>Get started to earn 2x points!</Text>
            </View>

            <TouchableOpacity onPress={showInfoPopup} style={styles.iconButton}>
              <FAIcon name={'info-circle'} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {join && (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title={'Back'} onPress={() => setJoin(false)} />
                <Button title={'Join'} onPress={joinFriendTracking} />
              </View>
              <TextInput
                placeholder="Enter Hover code from your friend"
                placeholderTextColor={Colors.gray600}
                onChangeText={(val) => setFriendCollabCode(val)}
                style={styles.formField}
              />
            </View>
          )}
          {start && (
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button title={'Back'} onPress={() => setStart(false)} />
                <Button title={'Refresh'} onPress={refreshData} />
              </View>
              <View>
                <ActivityIndicator />
                <Text style={{ ...Typography.largeBodyText, margin: Spacing.smaller, textAlign: 'center' }}>
                  Waiting for friend to join...
                </Text>
              </View>

              <View style={styles.collabCodeContainer}>
                <Text style={styles.collabCode}>{yourCollabCode}</Text>
              </View>
            </View>
          )}

          {!join && !start && !isEnabled && (
            <View style={styles.collabButtonsContainer}>
              <CustomButton style={styles.collabButton} onPress={startFriendTracking}>
                Start session
              </CustomButton>
              <CustomButton style={styles.collabButton} onPress={() => setJoin(true)}>
                Join friend
              </CustomButton>
            </View>
          )}
          {isEnabled && (
            <View>
              <Text style={{ ...Typography.headerText }}>Earning double points!!</Text>
              <Text style={{ ...Typography.largeBodyText }}>{friendName}</Text>
            </View>
          )}
        </View>

        <View style={styles.trackingInfo}>
          <Text style={styles.headerText}>Tracking...</Text>
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
            <Text style={styles.scoreText}>{nextScore()}</Text>
          </View>

          <View style={styles.stopButtonContainer}>
            <TouchableOpacity style={styles.stopButton} onPress={stopTracking}>
              <Text style={styles.stopButtonText}>Stop</Text>
            </TouchableOpacity>
            <View />
          </View>
        </View>
      </View>
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
    height: '98%',
    // backgroundColor: 'red',
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
    paddingHorizontal: Spacing.smallest,
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
  icon: {
    ...Typography.icon,
  },
  iconButton: {
    marginTop: Spacing.smaller,
  },
  trackingInfo: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: Spacing.smaller,
    marginTop: Spacing.smaller,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
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
    justifyContent: 'space-evenly',
    width: '100%',
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
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray900,
    textTransform: 'uppercase',
  },
  inner: {},
  keyboardAvoider: {},
  // mbSmall: {
  //   marginBottom: Spacing.smaller,
  // },
});

export default TrackingScreen;
