import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing, Typography } from '../../theme';
import { SettingsProps } from './SettingsMenuScreen';

const AboutScreen: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Here is some information about the App.</Text>
      <Text style={styles.bodyText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente error maiores, corporis molestias
        mollitia numquam voluptatem, sunt corrupti fugiat inventore hic doloribus, quidem odit quas consectetur eius
        labore ad!
      </Text>
      <Text style={styles.bodyText}>Hover Version 0.0.1</Text>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
  },
  titleText: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
  },
  bodyText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
});
