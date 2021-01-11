import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Typography } from '../theme';

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
  const snackbarStyles = {
    backgroundColor: getBackgroundColor(props.variant),
  };
  return (
    <View style={[styles.container, snackbarStyles]}>
      <Text>{props.title}</Text>
      <Text>{props.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  title: {
    ...Typography.headerText,
  },
  message: {
    ...Typography.bodyText,
  },
});

export default SnackBar;
