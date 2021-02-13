import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const stopTracking = () => tracking.pauseTracking();

  return (
    <View style={styles.container}>
      <HoverMap />
      <View style={styles.trackingContainer}>
        <View style={styles.trackingInfo}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  trackingContainer: {
    position: 'absolute',
    bottom: '1%',
    left: '1%',
    width: '98%',
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: Spacing.base,
  },
  trackingInfo: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.smaller,
  },
  stopButtonContainer: {
    justifyContent: 'center',
    paddingHorizontal: Spacing.smaller,
  },
  stopButton: {
    padding: Spacing.smallest,
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
});

export default TrackingScreen;
