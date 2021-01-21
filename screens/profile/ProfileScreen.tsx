import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';

const ProfileScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText }}>Your profile screen</Text>
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

export default ProfileScreen;
