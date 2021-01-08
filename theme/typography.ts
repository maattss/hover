import * as Colors from './colors';

const smallestFontSize = 10;
const smallFontSize = 14;
const baseFontSize = 18;
const largeFontSize = 24;
const largestFontSize = 32;

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

export const smallText = {
  fontSize: smallestFontSize,
  color: Colors.almostBlack,
};

export const bodyText = {
  fontSize: smallFontSize,
  color: Colors.almostBlack,
};

export const largeBodyText = {
  fontSize: baseFontSize,
  color: Colors.almostBlack,
};

export const headerText = {
  fontSize: largestFontSize,
  fontWeight: 'bold' as const,
  color: Colors.almostBlack,
};

export const screenHeader = {
  ...base,
  fontSize: largeFontSize,
  fontWeight: 'bold',
};

export const screenFooter = {
  ...base,
  ...bodyText,
};
