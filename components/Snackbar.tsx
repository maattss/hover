import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Colors, Typography } from '../theme';

interface SnackbarProps {
  variant: snackbarType;
  title: string;
  message: string;
}
export enum snackbarType {
  SUCCESS,
  WARNING,
  DANGER,
  INFO,
  DEFAULT,
}

const getBackgroundColor = (variant: snackbarType) => {
  switch (variant) {
    case snackbarType.SUCCESS:
      return Colors.green;
    case snackbarType.DANGER:
      return Colors.red;
    case snackbarType.WARNING:
      return Colors.yellow;
    case snackbarType.INFO:
      return Colors.blue;
    default:
      return Colors.gray200;
  }
};

const SnackBar = (props: SnackbarProps) => {
  const [showSnackBar, setShowSnackBar] = useState(true);
  const snackbarStyles = {
    backgroundColor: getBackgroundColor(props.variant),
  };
  return (
    showSnackBar && (
      <View style={[styles.container, snackbarStyles]}>
        <Text>{props.title}</Text>
        <Text>{props.message}</Text>
        <TouchableOpacity onPress={() => setShowSnackBar(false)} style={{ ...Buttons.button }}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    top: '5%',
    left: '5%',
    width: '90%',
    height: '10%',
  },
  title: {
    ...Typography.headerText,
  },
  message: {
    ...Typography.bodyText,
  },
});

export default SnackBar;
