// Palette colors
export const almostBlack = '#121212';
export const green = '#5C913B';
export const red = '#E74C3C';
export const blue = '#375A7F';
export const orange = '#CD5000';

// Base colors
export const black = '#000000';
export const transparent = 'rgba(0, 0, 0, 0)';
export const white = '#FFFFFF';
export const gray100 = '#F5F5F5';
export const gray200 = '#EEEEEE';
export const gray300 = '#E0E0E0';
export const gray400 = '#BDBDBD';
export const gray500 = '#9E9E9E';
export const gray600 = '#757575';
export const gray700 = '#616161';
export const gray800 = '#424242';
export const gray900 = '#222';

// Palettes
export const lightColors = {
  background: white,
  primary: blue,
  secondary: orange,
  text: almostBlack,
  error: red,
  success: green,
};

export const darkColors = {
  background: almostBlack,
  primary: blue,
  secondary: orange,
  text: white,
  error: red,
  success: green,
};

export type Colors = typeof lightColors;
