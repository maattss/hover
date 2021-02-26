import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import * as Progress from 'react-native-progress';
import { gray900 } from '../../theme/colors';
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
});

export default TrackingInformation;
