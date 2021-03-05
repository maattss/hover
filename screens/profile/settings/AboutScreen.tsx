import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import Constants from 'expo-constants';

const AboutScreen: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>About Hover</Text>
      <Text style={styles.bodyText}>
        Hover is a game created by Siri Mykland and Mats Tyldum as a part of our master project in Computer Science at
        the Norwegian University of Science and Technology (NTNU) during the spring of 2021. The goal of the project was
        to invent and develop an alternative game where Hover is the result of this work.
      </Text>
      <Text style={styles.bodyText}>Version {Constants.nativeAppVersion} (beta)</Text>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
  },
  titleText: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
    width: '100%',
    textAlign: 'center',
  },
  bodyText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
});
