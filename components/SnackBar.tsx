import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

interface SnackBarProps {
  variant: SnackBarVariant;
  title: string;
  message?: string;
  show: boolean;
  closeButton?: boolean;
}
export enum SnackBarVariant {
  SUCCESS,
  WARNING,
  DANGER,
  INFO,
  DEFAULT,
}

const getBackgroundColor = (variant: SnackBarVariant) => {
  switch (variant) {
    case SnackBarVariant.SUCCESS:
      return Colors.green;
    case SnackBarVariant.DANGER:
      return Colors.red;
    case SnackBarVariant.WARNING:
      return Colors.yellow;
    case SnackBarVariant.INFO:
      return Colors.blue;
    default:
      return Colors.almostBlack;
  }
};

const getColor = (variant: SnackBarVariant) => {
  switch (variant) {
    case SnackBarVariant.SUCCESS:
      return Colors.almostBlack;
    case SnackBarVariant.DANGER:
      return Colors.almostBlack;
    case SnackBarVariant.WARNING:
      return Colors.almostBlack;
    case SnackBarVariant.INFO:
      return Colors.almostWhite;
    default:
      return Colors.almostWhite;
  }
};

const SnackBar = (props: SnackBarProps) => {
  const [show, setShow] = useState(props.show);
  const snackBarBgColor = {
    backgroundColor: getBackgroundColor(props.variant),
  };
  const snackBarColor = {
    color: getColor(props.variant),
  };
  if (props.show || show) {
    return (
      <View style={[styles.container, snackBarBgColor]}>
        <Text style={[styles.title, snackBarColor]}>{props.title}</Text>
        <Text style={[styles.message, snackBarColor]}>{props.message}</Text>
        {props.closeButton && (
          <TouchableOpacity onPress={() => setShow(false)} style={styles.closeButton}>
            <FAIcon name="times" style={{ ...Buttons.buttonText }} />
          </TouchableOpacity>
        )}
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
  closeButton: {
    ...Buttons.iconButton,
    position: 'absolute',
    top: '12%',
    right: '2%',
  },
});

export default SnackBar;
