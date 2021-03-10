import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import * as Progress from 'react-native-progress';
import { HoverWithFriendState } from '../../types/hoverWithFriendsType';
import { TrackingState } from '../providers/TrackingProvider';

interface Props {
  collabState: HoverWithFriendState;
}

const TrackingInformation: React.FC<Props> = ({ collabState }: Props) => {
  const tracking = useTracking();
  const stopTracking = () => tracking.pauseTracking();

  const score = Math.floor(tracking.score);
  const progress = tracking.score - score;
  const nextScore = Math.ceil(tracking.score) === tracking.score ? tracking.score + 1 : Math.ceil(tracking.score);

  return (
    <View style={styles.trackingInfo}>
      <View style={styles.trackingInfoTopBar}>
        {collabState === HoverWithFriendState.ONGOING && (
          <View style={styles.collabIcon}>
            <Text style={styles.collabIconText}>2x points</Text>
          </View>
        )}
        <View>
          {tracking.trackingState !== TrackingState.TRACKINGPAUSED && (
            <Text style={styles.trackingHeader}>Tracking...</Text>
          )}
          {tracking.trackingState === TrackingState.TRACKINGPAUSED && (
            <>
              <Text style={styles.trackingHeader}>Tracking paused...</Text>
              <Text style={styles.trackingSubHeader}>Move to Hover zone to resume!</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressBarLabels}>
          <Text style={styles.label}>Points</Text>
          <Text style={styles.scoreText}>{score}</Text>
        </View>

        <View style={{ width: '55%' }}>
          <Progress.Bar
            progress={progress}
            width={null}
            height={24}
            borderColor={Colors.blue}
            color={Colors.blue}
            borderWidth={2}
          />
        </View>
        <View style={styles.progressBarLabels}>
          <Text style={styles.label}>Next</Text>
          <Text style={styles.scoreText}>{nextScore}</Text>
        </View>
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
  trackingSubHeader: {
    ...Typography.bodyText,
    textAlign: 'center',
  },
  progressBarLabels: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.smallest,
    paddingBottom: Spacing.base,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  scoreText: {
    ...Typography.headerText,
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
