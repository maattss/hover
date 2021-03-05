import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../../theme';
type DividerProps = {
  style?: ViewStyle;
};
const Divider: React.FC<DividerProps> = ({ style }: DividerProps) => {
  return <View style={[styles.divider, style]} />;
};

const styles = StyleSheet.create({
  divider: {
    borderColor: Colors.almostWhite,
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: Spacing.smaller,
  },
});

export default Divider;
