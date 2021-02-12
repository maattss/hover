import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, ActivityIndicator, Alert } from 'react-native';
import { Colors, Spacing, Buttons } from '../../theme';
import useTracking from '../../hooks/useTracking';
import HoverMap from '../../components/map/HoverMap';

const ExploreScreen: React.FC = () => {
  const tracking = useTracking();

  const startTracking = () => {
    if (tracking.insideGeoFence) tracking.startTracking();
  };
  const notInsideGeoFenceAlert = () => {
    Alert.alert(
      'Not inside a Hover zone',
      "Sorry, you can't start tracking here! Move to a Hover zone to start earning points.",
      [{ text: 'Ok', style: 'cancel' }],
    );
  };
  const getDynamicButtonStyles = () => {
    if (!tracking.insideGeoFence) {
      return {
        backgroundColor: Colors.grayTransparent,
      } as ViewStyle;
    } else {
      return {
        backgroundColor: Colors.greenTransparent,
      } as ViewStyle;
    }
  };

  return (
    <View>
      <HoverMap />
      <View style={styles.startButtonContainer}>
        <TouchableOpacity
          style={[styles.startButton, getDynamicButtonStyles()]}
          onPress={!tracking.insideGeoFence ? notInsideGeoFenceAlert : startTracking}
          disabled={tracking.loadingUserLocation}>
          {tracking.loadingUserLocation && <ActivityIndicator />}
          {!tracking.loadingUserLocation && <Text style={styles.startButtonText}>Start</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  startButtonContainer: {
    position: 'absolute',
    bottom: '10%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
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
