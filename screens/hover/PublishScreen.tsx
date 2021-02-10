import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  ViewStyle,
  Image,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { HoverStackParamList } from '../../types/navigationTypes';
import { FontAwesome as FAIcon } from '@expo/vector-icons';
import { getCategoryColor } from '../../components/feed/ActivityFeedCard';
import { durationToTimestamp, timeStampToHours } from '../../helpers/dateTimeHelpers';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';

const { width, height } = Dimensions.get('screen');

type NavigationProp = StackNavigationProp<HoverStackParamList>;

type ExploreProps = {
  navigation: NavigationProp;
};

const PublishScreen: React.FC<ExploreProps> = ({ navigation }: ExploreProps) => {
  const tracking = useTracking();
  const [caption, setCaption] = useState('');
  const insets = useSafeAreaInsets();

  const resumeTracking = () => {
    tracking.resumeTracking();
    navigation.navigate('Tracking');
  };

  const discardActivity = () => {
    Alert.alert('Discard activity', 'Are you sure you want to discard this activity? It will be lost forever.', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => {
          navigation.navigate('Explore');
          tracking.discardActivity();
        },
        style: 'destructive',
      },
    ]);
  };
  const publishActivity = () => {
    tracking.stopTracking(caption);
    navigation.navigate('Explore');
  };
  const categoryColor = {
    color: getCategoryColor(tracking.insideGeoFence?.category),
  };
  const getSafeAreaTop = () => {
    return {
      marginTop: insets.top,
    } as ViewStyle;
  };
  const getSafeAreaHeight = () => {
    return {
      height: insets.top,
    } as ViewStyle;
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={[styles.blackTop, getSafeAreaHeight()]} />
            <View>
              <View style={[styles.topBar, getSafeAreaTop()]}>
                <View style={styles.topBarIcon}>
                  <FAIcon name={'question-circle'} style={styles.questionIcon} />
                </View>

                <View style={styles.resumeDiscardContainer}>
                  <Text style={styles.infoTextSmall}>Not ready to publish{'\n'}this activity yet?</Text>
                  <View style={styles.resumeDiscardButtons}>
                    <TouchableOpacity
                      style={[styles.resumeButton, { backgroundColor: Colors.green }]}
                      onPress={resumeTracking}>
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
                  <Image
                    source={{ uri: getGeoFenceImage(tracking.insideGeoFence?.category) }}
                    style={styles.categoryIcon}
                  />
                </View>

                <View>
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
    height: height,
  },
  inner: {
    justifyContent: 'flex-end',
    padding: Spacing.small,
  },
  blackTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    zIndex: 98,
    backgroundColor: Colors.black,
  },
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
