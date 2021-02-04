import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { HoverStackParamList } from '../../types/navigationTypes';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<HoverStackParamList>;

type ExploreProps = {
  navigation: NavigationProp;
};

const PublishScreen: React.FC<ExploreProps> = ({ navigation }: ExploreProps) => {
  const tracking = useTracking();

  const resumeTracking = () => {
    tracking.startTracking();
    navigation.goBack();
  };

  const discardActivity = () => {
    Alert.alert('Discard activity', 'Are you sure you want to discard this activity? It will be lost forever.', [
      { text: 'No' },
      {
        text: "Yes, I don{'}t care",
        onPress: () => {
          tracking.discardActivity();
          navigation.navigate('Explore');
        },
      },
    ]);
  };
  const publishActivity = () => {
    tracking.stopTracking();
    navigation.navigate('Explore');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Publish</Text>
      <View style={styles.trackingInfoContainer}>
        <Text style={styles.scoreText}>Duration: {tracking.duration}</Text>
        <Text style={styles.scoreText}>Score: {Math.floor(tracking.score)}</Text>
      </View>
      <View style={styles.resumeButtonContainer}>
        <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.green }]} onPress={resumeTracking}>
          <Text style={styles.trackingButtonText}>Resume</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.publishButtonContainer}>
        <TouchableOpacity style={styles.discardButton} onPress={discardActivity}>
          <Text style={styles.publishButtonText}>Discard</Text>
          {/* <FAIcon name={'trash'} size={'large'} /> */}
        </TouchableOpacity>
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
  },
  trackingInfoContainer: {
    height: '30%',
    padding: Spacing.smallest,
    marginBottom: Spacing.smallest,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
  },
  scoreText: {
    ...Typography.headerText,
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
  resumeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: Spacing.base,
  },
  trackingButton: {
    padding: Spacing.smallest,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
  },
  trackingButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
  publishButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: Spacing.base,
  },
  publishButton: {
    ...Buttons.button,
  },
  discardButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
  },
  publishButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default PublishScreen;
