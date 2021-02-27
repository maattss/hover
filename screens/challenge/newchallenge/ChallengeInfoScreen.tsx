import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Spacing, Typography } from '../../../theme';

const ChallengeInfoScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Challenge information</Text>
      <Text style={styles.bodyText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis sapiente error maiores, corporis molestias
        mollitia numquam voluptatem, sunt corrupti fugiat inventore hic doloribus, quidem odit quas consectetur eius
        labore ad!
        {/* TODO: Insert challenge description */}
      </Text>
    </View>
  );
};
export default ChallengeInfoScreen;

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
    textAlign: 'left',
  },
  bodyText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
});
