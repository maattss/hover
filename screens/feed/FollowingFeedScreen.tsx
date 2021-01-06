import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

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
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default FollowingFeedScreen;
