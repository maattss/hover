import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Typography, Spacing } from '../../theme';

const FollowingFeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Followers&apos; Activites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
  },
  header: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
  },
});

export default FollowingFeedScreen;
