import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../theme';

const YourFeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Activities</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
  },
});

export default YourFeedScreen;
