import React from 'react';
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography } from '../../theme';

interface LoadingProps {
  text?: string;
  children?: React.ReactNode;
}
export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={'large'} color={Colors.blue} />
      {props.text && <Text style={styles.loadingText}>{props.text}</Text>}
      {props.children}
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
