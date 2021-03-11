import React from 'react';
import { StyleSheet, Text, View, Linking, TouchableOpacity, Image } from 'react-native';
import { Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import Constants from 'expo-constants';
import { Asset } from 'expo-asset';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const AboutScreen: React.FC<SettingsProps> = () => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={{ uri: Asset.fromModule(require('../../../assets/images/adaptive-icon.png')).uri }}
            style={styles.logo}
          />
        </View>
        <Text style={styles.bodyText}>
          Hover is a game created by Siri Mykland and Mats Tyldum as a part of our master project in Computer Science at
          the Norwegian University of Science and Technology (NTNU) during the spring of 2021. The goal of the project
          was to invent and develop an alternative game. This application is the result of that work.
        </Text>
        <Text style={styles.bodyText}>Any questions? Send us an email or checkout out our website.</Text>
        <View style={styles.centeredContainer}>
          <View style={{ justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Linking.openURL('mailto:contact.hoverapp@gmail.com')}>
              <FAIcon name={'envelope'} style={styles.icon} />
              <Text style={styles.mailButton}>contact.hoverapp@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => Linking.openURL('https://hover-game.web.app')}>
              <FAIcon name={'globe-europe'} style={styles.icon} />
              <Text style={styles.mailButton}>hover-game.web.app</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.versionFooter}>
        <Text style={styles.versionText}>Version {Constants.manifest.version}</Text>
      </View>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.large,
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: Spacing.small,
  },
  logo: {
    height: 150,
    width: 150,
  },
  bodyText: {
    ...Typography.bodyText,
    paddingBottom: Spacing.smaller,
  },
  centeredContainer: {
    marginVertical: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    paddingBottom: Spacing.small,
    alignItems: 'center',
  },
  icon: {
    ...Typography.icon,
    fontSize: 20,
    marginRight: Spacing.base,
  },
  mailButton: {
    ...Typography.bodyText,
    color: Colors.blue,
  },
  versionFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: Spacing.base,
  },
  versionText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
    fontWeight: 'bold',
    color: Colors.gray700,
    textAlign: 'center',
  },
});
