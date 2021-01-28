import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import FeedCard from '../../components/FeedCard';
import { Typography, Spacing } from '../../theme';

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Feed</Text>
      {/* TODO: Replace feedcard examples with refreshable list with data from API */}
      <FeedCard />
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

export default FeedScreen;
