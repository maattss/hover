import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

// TODO: Add common Text component which sets common text color and font family
export const Text: React.FC = (props) => {
  const { colors } = useTheme();
  return <DefaultText />;
};

// TODO: Add common View component which sets common background
export const View: React.FC = (props) => {
  const { colors } = useTheme();

  return <DefaultView />;
};
