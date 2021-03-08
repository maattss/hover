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
      <Text style={styles.headerText}>1. Choose opponent</Text>
      <Text style={styles.bodyText}>Select one or more people you want to compete against.</Text>
      <Text style={styles.headerText}>2. Choose challenge type</Text>
      <Text style={styles.bodyText}>
        Choose which type of challenge you want to create. There are four possibilities:
      </Text>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <View>
          <Text style={styles.listHeader}>Total time in category</Text>
          <Text style={styles.listText}>
            Spend as much time as possible tracking in a set category. The winner will be the first person to reach a
            set goal or the user who has spent most time hovering when the challenge period ends.
          </Text>
        </View>
      </View>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <View>
          <Text style={styles.listHeader}>Total time</Text>
          <Text style={styles.listText}>
            Spend as much time as possible tracking (category does not matter). The winner will be the first person to
            reach a set goal or the user who has spent most time hovering when the challenge period ends.
          </Text>
        </View>
      </View>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <View>
          <Text style={styles.listHeader}>Total score in category</Text>
          <Text style={styles.listText}>
            Complete activities in a set category and get as many points as possible. The winner will be the first
            person to reach a set goal or the user who has earned most points when the challenge period ends.
          </Text>
        </View>
      </View>
      <View style={styles.listItem}>
        <FAIcon name={'circle'} style={styles.bulletPoint} />
        <View>
          <Text style={styles.listHeader}>Total score</Text>
          <Text style={styles.listText}>
            Complete activities and get as many points as possible (category does not matter). The winner will be the
            first person to reach a set goal or the user who has earned most points when the challenge period ends.
          </Text>
        </View>
      </View>
      <Text style={styles.headerText}>3. Define details</Text>
      <Text style={styles.bodyText}>
        Determine the goal of the challenge and how long the challenge should last. The details are dependent on which
        type of challenge you selected.
      </Text>
      <Text style={styles.headerText}>4. Overview</Text>
      <Text style={styles.bodyText}>Take a last look at your challenge before completing the creation.</Text>
    </ScrollView>
  );
};
export default ChallengeInfoScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.base,
  },
  titleText: {
    ...Typography.headerText,
    paddingTop: Spacing.small,
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
    marginRight: Spacing.base,
  },
  bulletPoint: {
    color: Colors.almostWhite,
    fontSize: 8,
    marginRight: Spacing.smaller,
    paddingTop: Spacing.smallest,
    marginLeft: Spacing.smaller,
  },
  listHeader: {
    ...Typography.bodyText,
    fontWeight: 'bold',
  },
});
