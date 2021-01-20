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
  if (props.show) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hover?</Text>
        <Text style={styles.message}>You are inside a hover zone. Do you want to start tracking this activity?</Text>
        <TouchableOpacity onPress={() => props.setTracking(true)} style={styles.trackButton}>
          Yes!
        </TouchableOpacity>
      </View>
    );
  } else if (props.tracking) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hovering...</Text>
        <Text style={styles.message}>Hover, hover, hover... Never stop hovering.</Text>
        <TouchableOpacity onPress={() => props.completeActivity()} style={styles.trackButton}>
          Complete and upload activity
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
    backgroundColor: Colors.blue,
  },
  title: {
    ...Typography.headerText,
    paddingBottom: Spacing.base,
    textAlign: 'center',
  },
  message: {
    ...Typography.largeBodyText,
    display: 'flex',
  },
  trackButton: {
    ...Buttons.button,
    position: 'absolute',
    bottom: '0%',
    left: '0%',
  },
});

export default LocationSnackBar;
