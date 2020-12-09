import { almostBlack, white } from './colors';

export const lightColors = {
  background: white,
  primary: '#512DA8',
  secondary: '#512DA8',
  text: almostBlack,
  error: '#D32F2F',
  success: '#512DA8',
};

export const darkColors = {
  background: almostBlack,
  primary: '#B39DDB',
  secondary: '#512DA8',
  text: white,
  error: '#EF9A9A',
  success: '#512DA8',
};

export type Colors = typeof lightColors;
