import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, StyleSheet } from 'react-native';
import { Buttons, Colors, Spacing } from '../theme';

interface ButtonProps {
  onPress?: () => void;
  textStyle?: TextStyle;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ onPress, textStyle, style, children }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress} style={[styles.basicButton, style]}>
      <Text style={[{ ...Buttons.buttonText }, textStyle]}>{children}</Text>
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
