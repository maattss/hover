import * as Colors from './colors';

const smallestFontSize = 12;
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

export const icon = {
  fontSize: largeFontSize,
  color: Colors.almostWhite,
};
export const smallIcon = {
  fontSize: baseFontSize,
  color: Colors.almostWhite,
};

export const smallText = {
  fontSize: smallestFontSize,
  color: Colors.almostWhite,
};

export const bodyText = {
  fontSize: smallFontSize,
  color: Colors.almostWhite,
};

export const largeBodyText = {
  fontSize: baseFontSize,
  color: Colors.almostWhite,
};
export const xlBodyText = {
  fontSize: largeFontSize,
  fontWeight: 'bold' as const,
  color: Colors.almostWhite,
};

export const headerText = {
  fontSize: largestFontSize,
  fontWeight: 'bold' as const,
  color: Colors.almostWhite,
};

export const subHeaderText = {
  fontSize: baseFontSize,
  fontWeight: 'bold' as const,
  color: Colors.almostWhite,
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
