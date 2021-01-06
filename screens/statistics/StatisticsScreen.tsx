import React from 'react';
import { View, StyleSheet } from 'react-native';
import StatisticsTopBar from '../../navigation/StatisticsTopBar';

const TabThreeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <StatisticsTopBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexGrow: 1,
  },
});

export default TabThreeScreen;
