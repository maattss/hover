import { ApolloError } from '@apollo/client';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

interface ErrorProps {
  apolloError?: ApolloError;
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ apolloError, message }: ErrorProps) => {
  if (apolloError) console.error(apolloError);
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: Colors.red,
    padding: Spacing.small,
  },
  errorText: {
    ...Typography.largeBodyText,
  },
});
