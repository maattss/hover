import * as DefaultColors from './colors';

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
  color: DefaultColors.red,
  fontWeight: 'bold',
};

export const bodyText = {
  fontSize: smallFontSize,
  lineHeight: 19,
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
