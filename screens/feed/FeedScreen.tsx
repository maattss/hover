import React from 'react';
import { View, StyleSheet } from 'react-native';
import FeedTopBar from '../../navigation/FeedTopBar';

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FeedTopBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
});

export default FeedScreen;
