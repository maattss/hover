import React from 'react';
import { View, StyleSheet } from 'react-native';
import FeedTopBar from '../../navigation/FeedTopBar';
import { useTheme } from '../../theme/ThemeProvider';

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <FeedTopBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FeedScreen;
