import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../theme';

const YourStatisticsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Stats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingBottom: Spacing.base,
  },
  text: {
    paddingTop: Spacing.base,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Typography.headerFontSize,
  },
});

export default YourStatisticsScreen;
