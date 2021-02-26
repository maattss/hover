import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import * as Progress from 'react-native-progress';
import { HoverWithFriendState } from '../../screens/hover/TrackingScreen';

interface Props {
  collabState: HoverWithFriendState;
}

const TrackingInformation: React.FC<Props> = ({ collabState }: Props) => {
  const tracking = useTracking();
  const stopTracking = () => tracking.pauseTracking();
  const score = Math.floor(tracking.score);
  const progress = tracking.score - score;
  const nextScore = tracking.score == 0 ? 1 : Math.ceil(tracking.score);
  return (
    <View style={styles.trackingInfo}>
      <View style={styles.trackingInfoTopBar}>
        {collabState === HoverWithFriendState.ONGOING && (
          <View style={styles.collabIcon}>
            <Text style={styles.collabIconText}>2x points</Text>
          </View>
        )}
        <View>
          <Text style={styles.trackingHeader}>Tracking...</Text>
        </View>
      </View>
      <View style={styles.progressBarLabels}>
        <Text style={styles.label}>Points</Text>
        <View style={{ width: 240 }} />
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
  );
};

const styles = StyleSheet.create({
  trackingInfo: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: Spacing.smaller,
    marginTop: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  trackingInfoTopBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: Spacing.smaller,
  },
  collabIcon: {
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: Colors.gray900,
    height: '75%',
    borderColor: Colors.gold,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
    marginLeft: -Spacing.extraLarge,
    marginRight: Spacing.base,
  },
  collabIconText: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  trackingHeader: {
    ...Typography.headerText,
    marginVertical: Spacing.smaller,
  },
  progressBarLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  scoreText: {
    ...Typography.headerText,
    marginVertical: Spacing.small,
    marginHorizontal: Spacing.largest,
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
});

export default TrackingInformation;
