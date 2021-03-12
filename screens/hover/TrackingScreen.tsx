import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';
import HoverMap from '../../components/map/HoverMap';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import HoverWithFriends from '../../components/tracking/HoverWithFriends';
import TrackingInformation from '../../components/tracking/TrackingInformation';
import { HoverWithFriendState } from '../../types/hoverWithFriendsType';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import KeyboardAvoiderAbsolutePosition from '../../components/keyboard/KeyboardAvoiderAbsolutePosition';

const TrackingScreen: React.FC = () => {
  const [collabState, setCollabState] = useState(HoverWithFriendState.NONE);
  const [collabInfoHidden, setCollabInfoHidden] = useState(false);

  const insets = useSafeAreaInsets();
  const bottomPosition = {
    bottom: Platform.OS == 'ios' ? 0 : insets.bottom,
  };

  return (
    <>
      <HoverMap />
      <View style={[styles.infoContainer, bottomPosition]}>
        <KeyboardAvoiderAbsolutePosition newBottom={Platform.OS == 'ios' ? 50 : -200}>
          <View>
            <View style={collabInfoHidden ? { display: 'none' } : { display: 'flex' }}>
              <HoverWithFriends
                collabState={collabState}
                setCollabState={setCollabState}
                collabInfoHidden={collabInfoHidden}
                setCollabInfoHidden={setCollabInfoHidden}
              />
            </View>

            <View style={collabInfoHidden ? { display: 'flex' } : { display: 'none' }}>
              <View style={styles.rowFlexJustifyEnd}>
                <View style={styles.collabShowContainer}>
                  <TouchableOpacity onPress={() => setCollabInfoHidden(!collabInfoHidden)}>
                    <FAIcon name={'chevron-up'} style={styles.icon} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TrackingInformation collabState={collabState} />
          </View>
        </KeyboardAvoiderAbsolutePosition>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: 'absolute',
    left: Spacing.smallest,
    right: Spacing.smallest,
    marginBottom: Spacing.smallest,
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
