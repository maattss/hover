import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Buttons, Colors, Typography, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

export enum FeedCategory {
  ACTIVITY,
  ACHIEVEMENT,
  CHALLENGE,
}

const FeedCard = () => {
  return <View style={styles.card}>Feed card</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    height: '20%',
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
});

export default FeedCard;
