// Palette colors
const almostBlack = '#121212';
const green = '#5C913B';
const red = '#E74C3C';
const blue = '#375A7F';
const orange = '#CD5000';

// Base colors
export const black = '#000000';
export const transparent = 'rgba(0, 0, 0, 0)';
export const white = '#ffffff';
export const gray100 = '#F8F9FA';
export const gray200 = '#EBEBEB';
export const gray300 = '#DEE2E6';
export const gray400 = '#CED4DA';
export const gray500 = '#ABD5BD';
export const gray600 = '#888';
export const gray700 = '#444';
export const gray800 = '#303030';
export const gray900 = '#222';

// Pallettes
export const lightColors = {
  background: white,
  primary: blue,
  secondary: orange,
  text: almostBlack,
  error: red,
  success: green,
  black: black,
  white: white,
  transparent: transparent,
};

export const darkColors = {
  background: almostBlack,
  primary: blue,
  secondary: orange,
  text: white,
  error: red,
  success: green,
  black: black,
  white: white,
  transparent: transparent,
};

export type Colors = typeof lightColors;
