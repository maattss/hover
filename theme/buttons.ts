import * as Colors from './colors';
import * as Typography from './typography';
import * as Spacing from './spacing';

export const button = {
  color: Colors.almostBlack,
  padding: Spacing.base,
  borderRadius: Spacing.smaller,
  backgroundColor: Colors.white,
  alignItems: 'center' as const,
};

export const buttonText = {
  color: Colors.almostBlack,
  fontSize: Typography.bodyText,
  fontWeight: 'bold' as const,
  letterSpacing: 1,
};

export const iconButton = {
  fontSize: Typography.headerText,
  marginBottom: -3,
};

export const buttonTextUnselected = {
  ...buttonText,
  color: Colors.gray200,
};
