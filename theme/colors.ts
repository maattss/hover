import { Theme } from '@react-navigation/native';

// Palette colors
export const almostBlack = '#121212';
export const almostWhite = '#E5E5E7';
export const green = '#28A745';
export const red = '#DD2E44';
export const blue = '#0366d6';
export const orange = '#CD5000';
export const yellow = '#FBBD2D';
export const gold = '#FFD700';
export const silver = '#C0C0C0';
export const bronze = '#CD7F32';

// Transparent palette colors
export const transparent = 'rgba(0, 0, 0, 0)';
export const grayTransparent = 'rgba(66, 66, 66, 0.95)';
export const greenTransparent = 'rgba(40, 167, 69, 0.95)';
export const redTransparent = 'rgba(221, 46, 68, 0.95)';
export const blueTransparent = 'rgba(3, 102, 214, 0.95)';
export const almostBlackTransparent = 'rgba(18, 18, 18, 0.95)';

// Base colors
export const black = '#000000';
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

// Themes
export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: blue,
    background: black,
    card: almostBlack,
    text: almostWhite,
    border: almostBlack,
    notification: red,
  },
};

export const hexToRGB = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
};
