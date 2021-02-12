import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

interface LoadingProps {
  text?: string;
  children?: React.ReactNode;
}

export const Loading: React.FC<LoadingProps> = ({ text, children }: LoadingProps) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={Colors.blue} />
      {text && <Text style={styles.loadingText}>{text}</Text>}
      {children}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '20%',
  },
  loadingText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
});
