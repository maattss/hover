import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={Colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingBottom: '50%',
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
});

export default LoadingScreen;
