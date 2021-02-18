import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput, Switch } from 'react-native';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';
import Button from '../../components/general/Button';
import * as Progress from 'react-native-progress';

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const wordConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: ' ',
    style: 'upperCase',
    length: 2,
  };
  const [yourCollabCode, setYourCollabCode] = useState(uniqueNamesGenerator(wordConfig));
  const [friendCollabCode, setFriendCollabCode] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const stopTracking = () => tracking.pauseTracking();
  const score = Math.floor(tracking.score);
  const progress = tracking.score - score;
  return (
    <View style={styles.container}>
      <HoverMap customWidth={100} customHeight={100} />

      <View style={styles.trackingContainer}>
        <View style={styles.collabInfo}>
          <Text style={{ ...Typography.headerText }}>Hover with a friend</Text>
          <View style={styles.mbSmall}>
            <Text style={{ ...Typography.bodyText }}>Earn 2 x points by hovering together with a friend!</Text>
            <Text style={{ ...Typography.bodyText }}>
              Ask your friend for his/hers code and insert below or share your code.
            </Text>
          </View>
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

          <Button>Join friend</Button>
        </View>

        <View style={styles.trackingInfo}>
          <View>
            <Progress.Bar progress={progress} width={200} height={15} borderColor={Colors.blue} color={Colors.blue} />
            <Text style={styles.scoreText}>Points: {score}</Text>
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
    // backgroundColor: Colors.redTransparent,
  },
  trackingInfo: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: Spacing.smaller,
    marginTop: Spacing.smaller,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
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
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
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
