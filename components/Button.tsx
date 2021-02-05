import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Buttons, Colors, Spacing } from '../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

interface ButtonProps {
  onPress?: () => void;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.basicButton, props.style]}>
      <Text style={[{ ...Buttons.buttonText }, props.textStyle]}>{props.children}</Text>
    </TouchableOpacity>
  );
};
export default Button;

interface MenuButtonProps {
  onPress?: () => void;
  label: string;
  icon: string;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const MenuButton: React.FC<MenuButtonProps> = (props: MenuButtonProps) => {
  return (
    <TouchableOpacity style={[styles.basicButton, props.style]} disabled={props.disabled} onPress={props.onPress}>
      <Text style={{ ...Buttons.buttonText }}>{props.label}</Text>
      <FAIcon name={props.icon} style={{ ...Buttons.buttonText }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  basicButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});
