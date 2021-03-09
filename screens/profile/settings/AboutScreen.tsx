import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native';
import { Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import Constants from 'expo-constants';

const AboutScreen: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>About Hover</Text>
      <Text style={styles.bodyText}>
        Hover is a game created by Siri Mykland and Mats Tyldum as a part of our master project in Computer Science at
        the Norwegian University of Science and Technology (NTNU) during the spring of 2021. The goal of the project was
        to invent and develop an alternative game. This application is the result of that work. Any questions? Send us
        an email at:
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL('mailto:contact.hoverapp@gmail.com')}>
        <Text style={styles.mailButton}>contact.hoverapp@gmail.com</Text>
      </TouchableOpacity>
      <Text style={styles.versionText}>Version {Constants.manifest.version} (beta)</Text>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
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
    paddingBottom: Spacing.smaller,
  },
  versionText: {
    ...Typography.bodyText,
    paddingTop: Spacing.large,
    fontWeight: 'bold',
  },
  mailButton: {
    ...Typography.bodyText,
    color: Colors.blue,
    textAlign: 'center',
    padding: Spacing.smaller,
  },
});
