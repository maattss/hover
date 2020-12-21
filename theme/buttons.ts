import * as Colors from './colors';
import * as Typography from './typography';
import * as Spacing from './spacing';
import { Appearance } from 'react-native';

export const button = {
  padding: Spacing.base,
  borderRadius: Spacing.large,
  backgroundColor: Colors.blue,
};

export const buttonText = {
  color: Appearance.getColorScheme() == 'dark' ? Colors.white : Colors.almostBlack,
  fontSize: Typography.buttonFontSize,
  fontWeight: 'bold' as const,
  letterSpacing: 1,
};

export const buttonTextUnselected = {
  ...buttonText,
  color: Colors.gray200,
};
