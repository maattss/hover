import * as Colors from './colors';

const extraLargeFontSize = 32;
const largeFontSize = 24;
const buttonFontSize = 18;
const baseFontSize = 16;
const smallFontSize = 14;
const smallestFontSize = 10;
const largeHeaderFontSize = 20;
const headerFontSize = 32;

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
  fontSize: baseFontSize,
  color: Colors.almostBlack,
};

export const largeBodyText = {
  fontSize: largeFontSize,
  lineHeight: 26,
};

export const headerText = {
  fontSize: headerFontSize,
  fontWeight: 'bold' as const,
  color: Colors.almostBlack,
};

export const descriptionText = {
  fontSize: smallFontSize,
  color: Colors.almostBlack,
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
