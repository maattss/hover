import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { FontAwesome as FAIcon } from '@expo/vector-icons';
import { durationToTimestamp, timeStampToHours } from '../../helpers/dateTimeHelpers';
import Button from '../../components/general/Button';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import KeyboardAvoiderNoHeader from '../../components/general/KeyboarAvoiderNoHeader';

const PublishScreen: React.FC = () => {
  const tracking = useTracking();
  const [caption, setCaption] = useState('');

  // useEffect(
  //   () =>
  //     navigation.addListener('beforeRemove', (e) => {
  //       // Preventing going back to explore screen before activity is published/discarded
  //       e.preventDefault();
  //     }),
  //   [navigation],
  // );

  const resumeTracking = () => {
    tracking.resumeTracking();
    // navigation.navigate('Tracking'); TODO: Remove
  };

  const discardActivity = () => {
    Alert.alert('Discard activity', 'Are you sure you want to discard this activity? It will be lost forever.', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          //navigation.navigate('Explore'); TODO: Remove
          tracking.discardActivity();
        },
        style: 'destructive',
      },
    ]);
  };
  const publishActivity = () => {
    tracking.stopTracking(caption);
    // navigation.navigate('Explore'); TODO: Remove
  };

  return (
    <KeyboardAvoiderNoHeader>
      <View style={styles.topBar}>
        <View style={styles.topBarIcon}>
          <FAIcon name={'question-circle'} style={styles.questionIcon} />
        </View>

        <View style={styles.resumeDiscardContainer}>
          <Text style={styles.infoTextSmall}>Not ready to publish{'\n'}this activity yet?</Text>
          <View style={styles.resumeDiscardButtons}>
            <TouchableOpacity style={[styles.resumeButton, { backgroundColor: Colors.green }]} onPress={resumeTracking}>
              <Text style={{ ...Buttons.buttonText }}>Resume</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.discardButton} onPress={discardActivity}>
              <Text style={{ ...Buttons.buttonText }}>Discard</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.infoScore}>{Math.floor(tracking.score)} points</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Duration</Text>
          <Text style={styles.infoTextSmall}>{durationToTimestamp(tracking.duration)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Started at</Text>
          <Text style={styles.infoTextSmall}>{timeStampToHours(tracking.trackingStart)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Location</Text>
          <Text style={styles.infoTextSmall}>{tracking.insideGeoFence?.name}</Text>
        </View>
        <View style={[styles.infoContainer, { marginBottom: 0 }]}>
          <Text style={styles.infoText}>Category</Text>
          <Image source={{ uri: getGeoFenceImage(tracking.insideGeoFence?.category) }} style={styles.categoryIcon} />
        </View>

        <TextInput
          placeholder="Insert a funny text that describes the activity!"
          placeholderTextColor={Colors.gray600}
          onChangeText={(val) => setCaption(val)}
          style={styles.formField}
          multiline>
          {caption}
        </TextInput>
      </View>
      <Button onPress={publishActivity}>
        <Text style={styles.publishButtonText}>Publish</Text>
      </Button>
    </KeyboardAvoiderNoHeader>
  );
};

const styles = StyleSheet.create({
  categoryIcon: {
    height: 50,
    width: 50,
    marginVertical: Spacing.smallest,
    paddingRight: Spacing.smallest,
  },
  summaryContainer: {
    marginTop: Spacing.base,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    alignItems: 'center',
  },
  infoText: {
    ...Typography.largeBodyText,
    fontSize: 26,
    fontWeight: 'bold',
  },
  infoTextSmall: {
    ...Typography.largeBodyText,
    fontSize: 18,
  },
  infoScore: {
    ...Typography.headerText,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    paddingTop: Spacing.small,
    marginVertical: Spacing.smaller,
    backgroundColor: Colors.gray900,
  },
  publishButtonContainer: {
    marginBottom: 0,
  },
  publishButton: {
    ...Buttons.button,
    paddingHorizontal: Spacing.extraLarge,
  },
  publishButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
  },
  topBarIcon: {
    justifyContent: 'center',
    marginLeft: Spacing.base,
  },
  resumeDiscardContainer: {
    alignItems: 'flex-start',
  },
  resumeDiscardButtons: {
    marginTop: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  resumeButton: {
    ...Buttons.button,
    padding: Spacing.small,
    marginRight: Spacing.smaller,
  },
  discardButton: {
    ...Buttons.button,
    padding: Spacing.small,
    backgroundColor: Colors.red,
  },
  questionIcon: {
    fontSize: 60,
    color: Colors.almostWhite,
  },
});

export default PublishScreen;
