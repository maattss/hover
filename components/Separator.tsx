import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../theme';

export const Separator: React.FC = () => {
  return <View style={styles.separator}></View>;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    backgroundColor: Colors.gray800,
    height: 0.5,
  },
});
