import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';

const PublishScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText }}>Publish screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

export default PublishScreen;
