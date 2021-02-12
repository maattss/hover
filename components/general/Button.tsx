import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { CategoryIcon } from './CategoryIcon';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={[styles.basicButton, props.style, props.disabled ? styles.disabledButton : null]}>
      <Text style={[{ ...Buttons.largeButtonText }, props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};
export default Button;

interface IconButtonProps {
  onPress?: () => void;
  textStyle?: TextStyle;
  style?: ViewStyle | ViewStyle[];
  label: string;
  icon: string;
  iconStyle?: TextStyle;
}
export const IconButton: React.FC<IconButtonProps> = (props: IconButtonProps) => {
  return (
    <TouchableOpacity style={[styles.basicButton, props.style]} onPress={props.onPress}>
      <Text style={[{ ...Buttons.buttonText }, props.textStyle]}>{props.label}</Text>
      <FAIcon name={props.icon} style={[styles.buttonIcon, props.iconStyle]} />
    </TouchableOpacity>
  );
};

interface MenuButtonProps {
  onPress?: () => void;
  label: string;
  icon?: string;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const MenuButton: React.FC<MenuButtonProps> = (props: MenuButtonProps) => {
  return (
    <TouchableOpacity style={[styles.menuButton, props.style]} disabled={props.disabled} onPress={props.onPress}>
      <Text style={{ ...Buttons.buttonText }}>{props.label}</Text>
      <FAIcon name={props.icon ?? 'chevron-right'} style={{ ...Buttons.buttonText }} />
    </TouchableOpacity>
  );
};

interface CategoryButtonProps {
  onPress?: () => void;
  category: GeoFenceCategory;
  isSelected?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
}
export const CategoryButton: React.FC<CategoryButtonProps> = (props: CategoryButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.categoryButton, props.style, props.isSelected ? styles.isSelected : null]}
      onPress={props.onPress}>
      <CategoryIcon category={props.category} />
      <Text style={{ ...Typography.bodyText, textAlign: 'center', fontSize: 10 }}>{props.category.toString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  basicButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
    marginVertical: Spacing.small,
  },
  disabledButton: {
    ...Buttons.button,
    backgroundColor: Colors.gray500,
    width: '100%',
    marginVertical: Spacing.small,
  },
  buttonIcon: {
    ...Buttons.buttonText,
    paddingLeft: Spacing.small,
  },
  menuButton: {
    ...Buttons.button,
    marginBottom: Spacing.smaller,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray900,
  },
  categoryButton: {
    ...Typography.bodyText,
    backgroundColor: Colors.gray700,
    borderRadius: Spacing.smaller,
    paddingVertical: Spacing.base,
    margin: Spacing.smallest,
    width: '22%',
  },
  isSelected: {
    backgroundColor: Colors.gray900,
  },
});
