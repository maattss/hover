import * as DefaultColors from './colors';
import { Appearance } from 'react-native';
import { ThemeContext } from './ThemeProvider';
import { ThemeProvider } from '@react-navigation/native';

export const extraLargeFontSize = 32;
export const largeFontSize = 24;
export const buttonFontSize = 18;
export const baseFontSize = 16;
export const smallFontSize = 14;
export const smallestFontSize = 10;
export const largeHeaderFontSize = 20;
export const headerFontSize = 32;

const base = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

export const link = {
  color: DefaultColors.red,
  fontWeight: 'bold',
};

export const bodyText = {
  fontSize: smallFontSize,
  lineHeight: 19,
};

export const largeBodyText = {
  fontSize: largeFontSize,
  lineHeight: 26,
};

export const headerText = {
  fontSize: headerFontSize,
  fontWeight: 'bold' as const,
};

export const descriptionText = {
  fontSize: smallFontSize,
};

export const screenHeader = {
  ...base,
  fontSize: largeFontSize,
  fontWeight: 'bold',
};

export const screenFooter = {
  ...base,
  ...descriptionText,
};

export const sectionHeader = {
  ...base,
  ...headerText,
};

export const count = {
  ...base,
  ...descriptionText,
};
