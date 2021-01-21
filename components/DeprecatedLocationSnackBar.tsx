import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';

interface LocationSnackBarProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  tracking: boolean;
  setTracking: React.Dispatch<React.SetStateAction<boolean>>;
  completeActivity: () => void;
}

const LocationSnackBar = (props: LocationSnackBarProps) => {
  if (props.tracking) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inside a Hover zone!</Text>
        <Text style={styles.message}>
          [Tracking: {props.tracking}, Show: {props.show}]
        </Text>
        <Text style={styles.message}>Do you want to start tracking this activity?</Text>
        <TouchableOpacity onPress={() => props.setTracking(true)} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.setTracking(false)} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>No</Text>
        </TouchableOpacity>
      </View>
    );
  } else if (props.show) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Earning points..</Text>
        <Text style={styles.message}>
          [Tracking: {props.tracking ? 'true' : 'false'}, Show: {props.show ? 'true' : 'false'}]
        </Text>
        <Text style={styles.message}>Good job, keep this activity going!</Text>
        <Text style={styles.message}>Number of points earned: 0</Text>
        <TouchableOpacity onPress={() => props.completeActivity()} style={styles.confirmButton}>
          <Text style={styles.confirmButtonText}>Complete and upload activity</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <></>;
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    bottom: '2%',
    left: '2%',
    width: '96%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    backgroundColor: Colors.hexToRGB(Colors.blue, 0.8),
  },
  title: {
    ...Typography.headerText,
    paddingBottom: Spacing.base,
    textAlign: 'center',
  },
  message: {
    ...Typography.largeBodyText,
    display: 'flex',
    textAlign: 'center',
  },
  confirmButton: {
    ...Buttons.button,
    marginTop: Spacing.base,
    width: '100%',
    backgroundColor: Colors.hexToRGB(Colors.white, 0.9),
  },
  confirmButtonText: {
    ...Buttons.buttonText,
    color: Colors.almostBlack,
  },
});

export default LocationSnackBar;
