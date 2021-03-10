import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const AboutScreen: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.container}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        source={{ uri: Asset.fromModule(require('../../../assets/images/adaptive-icon.png')).uri }}
        style={styles.logo}
      />
      <Text style={styles.bodyText}>
        Hover is a game created by Siri Mykland and Mats Tyldum as a part of our master project in Computer Science at
        the Norwegian University of Science and Technology (NTNU) during the spring of 2021. The goal of the project was
        to invent and develop an alternative game. This application is the result of that work.
      </Text>

      <Text style={styles.bodyText}>Any questions? Send us an email or checkout out our website.</Text>
      <View style={{ marginVertical: Spacing.base }}>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('mailto:contact.hoverapp@gmail.com')}>
          <FAIcon name={'envelope'} style={styles.icon} />
          <Text style={styles.mailButton}>contact.hoverapp@gmail.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://hover-game.web.app')}>
          <FAIcon name={'globe-europe'} style={styles.icon} />
          <Text style={styles.mailButton}>hover-game.web.app</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    height: 120,
    width: 120,
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
    textAlign: 'center',
  },
  versionText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    paddingBottom: Spacing.small,
  },
  icon: {
    ...Typography.icon,
    fontSize: 20,
    textAlign: 'center',
    marginRight: Spacing.base,
  },
  mailButton: {
    ...Typography.bodyText,
    color: Colors.blue,
  },
});
