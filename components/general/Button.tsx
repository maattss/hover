import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Buttons, Colors, Spacing } from '../../theme';
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
    marginVertical: Spacing.small,
  },
});
