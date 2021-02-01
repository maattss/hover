import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing, Typography } from '../../theme';

const ChallengeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Challenge screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ChallengeScreen;
