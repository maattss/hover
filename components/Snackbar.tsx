import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';

interface SnackbarProps {
  variant: snackbarType;
  title: string;
  message?: string;
  show: boolean;
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
  const [open, setOpen] = useState(true);
  const snackbarStyles = {
    backgroundColor: getBackgroundColor(props.variant),
  };
  useEffect(() => {
    if (props.show) setOpen(true);
  }, [props.show]);
  if (open) {
    return (
      <View style={[styles.container, snackbarStyles]}>
        <Text>{props.title}</Text>
        <Text>{props.message}</Text>
        <TouchableOpacity onPress={() => setOpen(false)} style={{ ...Buttons.button }}>
          <Text>Close</Text>
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
    top: '5%',
    left: '5%',
    width: '90%',
    height: '10%',
    borderRadius: Spacing.smaller,
  },
  title: {
    ...Typography.headerText,
  },
  message: {
    ...Typography.bodyText,
  },
});

export default SnackBar;
