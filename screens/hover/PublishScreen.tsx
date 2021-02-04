import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { HoverStackParamList } from '../../types/navigationTypes';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { getCategoryColor, getCategoryIconName } from '../../components/feed/ActivityFeedCard';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { timeStampToHours } from '../../helpers/dateTimeHelpers';

type NavigationProp = StackNavigationProp<HoverStackParamList>;

type ExploreProps = {
  navigation: NavigationProp;
};

const PublishScreen: React.FC<ExploreProps> = ({ navigation }: ExploreProps) => {
  const tracking = useTracking();
  const [caption, setCaption] = useState('');

  const resumeTracking = () => {
    tracking.startTracking();
    navigation.navigate('Tracking');
  };

  const discardActivity = () => {
    Alert.alert('Discard activity', 'Are you sure you want to discard this activity? It will be lost forever.', [
      { text: 'No' },
      {
        text: "Yes, I don't care",
        onPress: () => {
          tracking.discardActivity();
          navigation.navigate('Explore');
        },
      },
    ]);
  };
  const publishActivity = () => {
    tracking.stopTracking('Test caption');
    navigation.navigate('Explore');
  };
  const categoryColor = {
    color: getCategoryColor(GeoFenceCategory.EDUCATION),
  };
  // TODO: Update resume/discard buttons
  // TODO: Add appropriate geofence category
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View style={styles.topBarIcon}>
          <FAIcon name={'question'} style={styles.questionIcon} />
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

      <View style={styles.trackingInfoContainer}>
        <Text style={styles.infoScore}>{Math.floor(tracking.score)} points</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Duration</Text>
          <Text style={styles.infoTextSmall}>{tracking.duration}</Text>
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
          <FAIcon
            style={[styles.categoryIcon, categoryColor]}
            name={getCategoryIconName(tracking.insideGeoFence?.category)}
          />
        </View>
        <TextInput
          placeholder="Insert a funny text that describes the activity!"
          placeholderTextColor={Colors.gray600}
          onChangeText={(val) => setCaption(val)}
          style={styles.formField}
          numberOfLines={3}
          multiline>
          {caption}
        </TextInput>
      </View>

      <View style={styles.publishButtonContainer}>
        <TouchableOpacity style={styles.publishButton} onPress={publishActivity}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing.smaller,
    justifyContent: 'space-between',
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 42,
    textAlign: 'center',
    paddingRight: Spacing.smallest,
  },
  trackingInfoContainer: {
    padding: Spacing.base,
    marginBottom: Spacing.smallest,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.small,
  },
  infoText: {
    ...Typography.largeBodyText,
    fontSize: 26,
    fontWeight: 'bold',
  },
  infoTextSmall: {
    ...Typography.largeBodyText,
    fontSize: 20,
  },
  infoScore: {
    ...Typography.headerText,
    marginBottom: Spacing.base,
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
    padding: Spacing.base,
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
    marginTop: Spacing.small,
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
  },
  topBarIcon: {
    padding: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
  resumeDiscardContainer: {
    width: '75%',
    alignItems: 'center',
  },
  resumeDiscardButtons: {
    marginTop: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  resumeButton: {
    ...Buttons.button,
    marginRight: Spacing.smaller,
  },
  discardButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
  },
  questionIcon: {
    fontSize: 40,
    color: Colors.almostWhite,
  },
});

export default PublishScreen;
