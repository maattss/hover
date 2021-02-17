import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { uniqueNamesGenerator, Config, adjectives, animals } from 'unique-names-generator';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const [collabCode, setCollabCode] = useState('');
  const stopTracking = () => tracking.pauseTracking();

  const wordConfig: Config = {
    dictionaries: [adjectives, animals],
    separator: ' ',
    style: 'upperCase',
    length: 2,
  };

  const collabName: string = uniqueNamesGenerator(wordConfig);

  return (
    <View style={styles.container}>
      <HoverMap />

      <View style={styles.trackingContainer}>
        <View style={styles.collabInfo}>
          <Text style={{ ...Typography.headerText }}>Hover with friends</Text>
          <Text style={{ ...Typography.largeBodyText }}>Your code: {collabName}</Text>
          <TextInput
            placeholder="Enter code"
            placeholderTextColor={Colors.gray600}
            onChangeText={(val) => setCollabCode(val)}
            style={styles.formField}
          />
        </View>

        <View style={styles.trackingInfo}>
          <Text style={{ ...Typography.headerText }}>Tracking info</Text>
          <View style>
            <View>
              <ActivityIndicator size={'large'} color={Colors.blue} />
              <Text style={styles.scoreText}>Points: {Math.floor(tracking.score)}</Text>
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
    flexDirection: 'row',
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  stopButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.smaller,
  },
  stopButton: {
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
    backgroundColor: Colors.redTransparent,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: Colors.almostBlack,
    shadowOffset: { height: 0, width: 0 },
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
});

export default TrackingScreen;
