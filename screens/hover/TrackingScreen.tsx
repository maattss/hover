import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Switch,
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
import Divider from '../../components/general/Divider';
import KeyboardAvoiderNoHeader from '../../components/general/KeyboarAvoiderNoHeader';
import { useUpdateFriendTrackingMutation } from '../../graphql/mutations/UpdateFriendTracking.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { useInsertFriendTrackingMutation } from '../../graphql/mutations/InserFriendTracking.generated';

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
  const nextScore = tracking.score == 0 ? 1 : Math.ceil(tracking.score);
  const progress = tracking.score - score;

  const yourCollabCode = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const [UpdateFriendTracking] = useUpdateFriendTrackingMutation();
  const [InsertFriendTracking] = useInsertFriendTrackingMutation();

  const showInfoPopup = () =>
    Alert.alert(
      'Hover together with a friend and earn 2x points!',
      'Start a session to get a code you can share, or ' + 'join a friends by inserting their code.',
    );
  const refreshData = () => {
    console.log('Refresh friend tracking data');
    // Refetch from db
  };

  const startFriendTracking = async () => {
    console.log('Start friend tracking');
    setStart(true);
    try {
      const response = await InsertFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: friendCollabCode,
          geofence_id: tracking.insideGeoFence?.id ?? 0,
        },
      });
      console.log('Start response', response);
      setIsEnabled(true);
    } catch (error) {
      console.error('Mutation error', error.message);
    }
  };

  const joinFriendTracking = async () => {
    console.log('Joining friend');
    setJoin(false);
    try {
      const response = await UpdateFriendTracking({
        variables: {
          user_id: auth.user?.uid ?? '',
          linking_word: friendCollabCode,
          date: Date.now(),
          geofence_id: tracking.insideGeoFence?.id ?? 0,
        },
      });
      console.log('Join response', response);
      setIsEnabled(true);
    } catch (error) {
      console.error('Mutation error', error.message);
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
  },
  inner: {},
  keyboardAvoider: {},
  // mbSmall: {
  //   marginBottom: Spacing.smaller,
  // },
});

export default TrackingScreen;
