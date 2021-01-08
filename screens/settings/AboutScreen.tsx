import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing, Typography } from '../../theme';
import { SettingsProps } from './SettingsScreen';

const AboutScreen: React.FC<SettingsProps> = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.largeBodyText }}>Here is some information about the App.</Text>
      <Text style={{ ...Typography.bodyText }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente error maiores, corporis molestias
        mollitia numquam voluptatem, sunt corrupti fugiat inventore hic doloribus, quidem odit quas consectetur eius
        labore ad!
      </Text>
      <Text style={{ ...Typography.bodyText }}>Hover Version 0.0.1</Text>
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
});
