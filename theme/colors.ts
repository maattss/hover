import { Theme } from '@react-navigation/native';

// Palette colors
export const almostBlack = '#121212';
export const almostWhite = '#E5E5E7';
export const green = '#5C913B';
export const red = '#FF453A';
export const blue = '#007AFF';
export const orange = '#CD5000';
export const yellow = '#FBBD2D';

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

export const LightTheme: Theme = {
  dark: false,
  colors: {
    primary: blue,
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(216, 216, 216)',
    notification: 'rgb(255, 59, 48)',
  },
};
