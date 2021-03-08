import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Spacing, Typography, Colors } from '../../../theme';
import { FontAwesome as FAIcon } from '@expo/vector-icons';

const ChallengeInfoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titleText}>Challenge information</Text>
      <Text style={styles.bodyText}>
        Create a challenge to compete with your friends. Below are some information about the four steps you need to
        complete before the challenge is created.
      </Text>
      <Text style={styles.headerText}>Choose opponent</Text>
      <Text style={styles.bodyText}>Select one or more people you want to compete against.</Text>
      <Text style={styles.headerText}>Choose challenge type</Text>
      <Text style={styles.bodyText}>
        Choose which type of challenge you want to create. There are four possibilities:
      </Text>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <Text style={styles.listText}>Total time in category</Text>
      </View>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <Text style={styles.listText}>Total time</Text>
      </View>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <Text style={styles.listText}>Total score</Text>
      </View>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <Text style={styles.listText}>Total score in category</Text>
      </View>
      <Text style={styles.headerText}>Define details</Text>
      <Text style={styles.bodyText}>
        Determine the goal of the challenge and how lonelong the challenge should last. The details are dependent on
        which type of challenge you selected.
      </Text>
      <Text style={styles.headerText}>Overview</Text>
      <Text style={styles.bodyText}>Take a last look at your challenge before completing the creation.</Text>
    </ScrollView>
  );
};
export default ChallengeInfoScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.large,
  },
  titleText: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
    width: '100%',
    textAlign: 'left',
  },
  bodyText: {
    ...Typography.bodyText,
    paddingTop: Spacing.smallest,
  },
  headerText: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
    paddingTop: Spacing.base,
  },
  listItem: {
    flexDirection: 'row',
    marginTop: Spacing.smaller,
  },
  listText: {
    ...Typography.bodyText,
  },
  bulletPoint: {
    color: Colors.almostWhite,
    fontSize: 8,
    marginRight: Spacing.smaller,
    paddingTop: Spacing.smallest,
    marginLeft: Spacing.smaller,
  },
});
