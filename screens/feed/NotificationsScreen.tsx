import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../theme';

const NotificationsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
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

export default NotificationsScreen;
