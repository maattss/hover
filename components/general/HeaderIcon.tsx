import React from 'react';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../theme';

export const HeaderIcon = (props: { name: string; onPress?: () => void }) => {
  return <FAIcon style={styles.headericon} {...props} />;
};

const styles = StyleSheet.create({
  headericon: {
    ...Typography.icon,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.smaller,
    marginRight: Spacing.smaller,
  },
});
