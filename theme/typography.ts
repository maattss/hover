import * as Colors from './colors';
import { Appearance } from 'react-native';

export const extraLargeFontSize = 32;
export const largeFontSize = 24;
export const buttonFontSize = 18;
export const baseFontSize = 16;
export const smallFontSize = 14;
export const smallestFontSize = 10;
export const largeHeaderFontSize = 20;
export const headerFontSize = 18;

const base = {
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
};

export const link = {
  color: Colors.red,
  fontWeight: 'bold',
};

export const bodyText = {
  color: Appearance.getColorScheme() == 'dark' ? Colors.white : Colors.almostBlack,
  fontSize: smallFontSize,
  lineHeight: 19,
};

export const headerText = {
  color: Appearance.getColorScheme() == 'dark' ? Colors.white : Colors.almostBlack,
  fontSize: headerFontSize,
  fontWeight: 'bold',
};

export const descriptionText = {
  color: Appearance.getColorScheme() == 'dark' ? Colors.white : Colors.almostBlack,
  fontSize: smallFontSize,
};

export const screenHeader = {
  ...base,
  color: Appearance.getColorScheme() == 'dark' ? Colors.white : Colors.almostBlack,
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
