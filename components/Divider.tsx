import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '../theme';

const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: Colors.almostWhite,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: Spacing.smaller,
  },
});

export default Divider;
