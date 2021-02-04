import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { HoverStackParamList } from '../../types/navigationTypes';

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

  const publishActivity = () => {
    tracking.stopTracking();
    navigation.navigate('Explore');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Publish Activity</Text>
      <View style={styles.trackingInfoContainer}>
        <Text style={styles.scoreText}>Duration: {tracking.duration}</Text>
        <Text style={styles.scoreText}>Score: {Math.floor(tracking.score)}</Text>
      </View>
      <View style={styles.stopButtonContainer}>
        <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.green }]} onPress={resumeTracking}>
          <Text style={styles.trackingButtonText}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.blue }]} onPress={publishActivity}>
          <Text style={styles.trackingButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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
  stopButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Spacing.extraLarge,
    marginRight: Spacing.extraLarge,
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
});

export default PublishScreen;
