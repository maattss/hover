import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, ActivityIndicator, Dimensions } from 'react-native';
import { Colors, Spacing, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';

const ExploreScreen: React.FC = () => {
  const tracking = useTracking();

  const getDynamicButtonStyles = () => {
    if (
      !tracking.currentGeoFence ||
      (tracking.locationPermission && tracking.locationPermission.status !== 'granted')
    ) {
      return {
        backgroundColor: Colors.grayTransparent,
      } as ViewStyle;
    } else {
      return {
        backgroundColor: Colors.greenTransparent,
      } as ViewStyle;
    }
  };

  const startButtonLeft = () => {
    return {
      left: Dimensions.get('screen').width / 2 - 55,
    } as ViewStyle;
  };

  return (
    <>
      <HoverMap />
      <View style={[styles.startButtonContainer, startButtonLeft()]}>
        <TouchableOpacity
          style={[styles.startButton, getDynamicButtonStyles()]}
          onPress={tracking.startTracking}
          disabled={tracking.loadingUserLocation}>
          {tracking.loadingUserLocation && <ActivityIndicator />}
          {!tracking.loadingUserLocation && <Text style={styles.startButtonText}>Start</Text>}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  startButtonContainer: {
    position: 'absolute',
    bottom: Spacing.smaller,
  },
  startButton: {
    padding: Spacing.smallest,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowColor: Colors.almostBlack,
    shadowOffset: { height: 0, width: 0 },
  },
  startButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ExploreScreen;
