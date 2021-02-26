import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import * as Progress from 'react-native-progress';
import { gray900 } from '../../theme/colors';
import HoverWithFriends from '../../components/tracking/HoverWithFriends';

export enum HoverWithFriendState {
  NONE,
  STARTING,
  JOINING,
  ONGOING,
}

const TrackingScreen: React.FC = () => {
  const tracking = useTracking();
  const stopTracking = () => tracking.pauseTracking();
  const score = Math.floor(tracking.score);
  const progress = tracking.score - score;
  const nextScore = tracking.score == 0 ? 1 : Math.ceil(tracking.score);
  const [collabState, setCollabState] = useState<HoverWithFriendState>(HoverWithFriendState.NONE);
  const [collabInfoHidden, setCollabInfoHidden] = useState(false);

  return (
    <>
      <HoverMap />

      <View style={styles.infoContainer}>
        {!collabInfoHidden && (
          <HoverWithFriends
            collabState={collabState}
            setCollabState={setCollabState}
            collabInfoHidden={collabInfoHidden}
            setCollabInfoHidden={setCollabInfoHidden}
          />
        )}

        {collabInfoHidden && (
          <View style={styles.rowFlexJustifyEnd}>
            <View style={styles.collabShowContainer}>
              <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
                <FAIcon name={'chevron-up'} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}

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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // Common
  rowFlex: {
    flexDirection: 'row',
  },
  rowFlexSpaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowFlexJustifyStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  rowFlexJustifyEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  iconSmall: {
    ...Typography.smallIcon,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  icon: {
    ...Typography.icon,
    width: 35,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
  iconBlue: {
    color: Colors.blue,
    fontSize: Typography.largeBodyText.fontSize,
    marginHorizontal: Spacing.smaller,
  },
  iconButton: {
    marginTop: Spacing.smaller,
    marginRight: Spacing.smaller,
  },

  // Specific
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '98%',
    margin: Spacing.smallest,
  },
  collabInfo: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
  },
  collabTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
  },
  collabSubHeader: {
    ...Typography.largeBodyText,
    marginTop: Spacing.smallest,
    fontStyle: 'italic',
  },
  collabButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: Spacing.smaller,
  },
  collabButton: {
    width: '47%',
    padding: Spacing.small,
  },
  collabCodeContainer: {
    marginVertical: Spacing.smaller,
    borderRadius: Spacing.smaller,
    backgroundColor: gray900,
  },
  waitingForFriendLabel: {
    ...Typography.largeBodyText,
    marginTop: Spacing.small,
    textAlign: 'center',
  },
  collabCode: {
    ...Typography.xlBodyText,
    textAlign: 'center',
    paddingVertical: Spacing.smaller,
  },
  collabJoiningBack: {
    marginLeft: 0,
    marginTop: -Spacing.smallest,
  },
  collabJoiningLabel: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: Spacing.smaller,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginVertical: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  friendContainer: {
    marginVertical: Spacing.smaller,
  },
  collabFriendName: {
    ...Typography.headerText,
    fontSize: 25,
    margin: Spacing.small,
  },
  collabShowContainer: {
    paddingHorizontal: Spacing.smaller,
    paddingVertical: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
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

export default TrackingScreen;
