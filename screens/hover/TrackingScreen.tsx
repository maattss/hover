import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';
import HoverMap from '../../components/map/HoverMap';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import HoverWithFriends from '../../components/tracking/HoverWithFriends';
import TrackingInformation from '../../components/tracking/TrackingInformation';

export enum HoverWithFriendState {
  NONE,
  STARTING,
  JOINING,
  ONGOING,
}

const TrackingScreen: React.FC = () => {
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

        <TrackingInformation collabState={collabState} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '98%',
    margin: Spacing.smallest,
  },
  rowFlexJustifyEnd: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  collabShowContainer: {
    paddingHorizontal: Spacing.smaller,
    paddingVertical: Spacing.smallest,
    backgroundColor: Colors.almostBlackTransparent,
    borderRadius: Spacing.smaller,
  },
  icon: {
    ...Typography.icon,
    width: 35,
    textAlign: 'center',
    marginVertical: Spacing.smallest,
  },
});

export default TrackingScreen;
