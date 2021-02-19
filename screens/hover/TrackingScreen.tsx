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
} from 'react-native';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';
import CustomButton from '../../components/general/Button';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';

const wordConfig: Config = {
  dictionaries: [adjectives, animals],
  separator: ' ',
  style: 'upperCase',
  length: 2,
};

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const [join, setJoin] = useState(false);
  const [start, setStart] = useState(false);

  const stopTracking = () => tracking.pauseTracking();
  const score = Math.floor(tracking.score);
  const nextScore = Math.ceil(tracking.score + 0.000001);
  const progress = tracking.score - score;

  const [yourCollabCode, setYourCollabCode] = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  const showInfoPopup = () =>
    Alert.alert(
      'Hover together with a friend and earn 2x points!',
      'Start a session to get a code you can share, or ' + 'join a friends by inserting their code.',
    );

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <HoverMap />
      </View>

      <View style={styles.trackingContainer}>
        <View style={styles.collabInfo}>
          <View style={styles.collabTopBar}>
            <View>
              <Text style={{ ...Typography.xlBodyText }}>Hover with friend</Text>
              <Text style={styles.collabSubHeader}>Get started to earn 2x points!</Text>
            </View>

            <TouchableOpacity onPress={showInfoPopup} style={styles.iconButton}>
              <FAIcon name={'info-circle'} style={styles.icon} />
            </TouchableOpacity>
          </View>

          {/* 
          <View style={styles.mbSmall}>
            <Text style={styles.label}>Your code</Text>
            <Text style={{ ...Typography.headerText, width: '100%', textAlign: 'center' }}>{yourCollabCode}</Text>
          </View>
          <View>
            <Text style={styles.label}>Friend&apos;s code</Text>
            <TextInput
              placeholder="Enter Hover code from your friend"
              placeholderTextColor={Colors.gray600}
              onChangeText={(val) => setFriendCollabCode(val)}
              style={styles.formField}
            />
          </View> 
          */}

          {/* TODO: Replace */}
          {join && <Text style={{ ...Typography.largeBodyText }}>Join</Text>}
          {start && <Text style={{ ...Typography.largeBodyText }}>Start</Text>}

          {!join && !start && (
            <View style={styles.collabButtons}>
              <CustomButton style={{ width: '47%', padding: Spacing.small }} onPress={() => setStart(true)}>
                Start session
              </CustomButton>
              <CustomButton style={{ width: '47%', padding: Spacing.small }} onPress={() => setJoin(true)}>
                Join friend
              </CustomButton>
            </View>
          )}
        </View>

        <View style={styles.trackingInfo}>
          <Text style={styles.headerText}>Tracking...</Text>
          <View style={styles.progressBarLabels}>
            <Text style={styles.label}>Points</Text>
            <View style={{ marginHorizontal: '35%' }} />
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
  trackingContainer: {
    position: 'absolute',
    bottom: 0,
    left: '1%',
    width: '98%',
    backgroundColor: 'red',
    marginBottom: Spacing.smaller,
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
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
  },
  collabSubHeader: {
    ...Typography.largeBodyText,
    marginTop: Spacing.smallest,
    fontStyle: 'italic',
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
  collabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: Spacing.smaller,
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
  scoreText: {
    ...Typography.headerText,
    marginVertical: Spacing.small,
  },
  headerText: {
    ...Typography.headerText,
    marginVertical: Spacing.smaller,
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray900,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
  },
  mbSmall: {
    marginBottom: Spacing.smaller,
  },
});

export default TrackingScreen;
