import React from 'react';
import { TouchableOpacity, Text, TextStyle, ViewStyle, StyleSheet, Image, View } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { GeoFenceCategory } from '../../types/geoFenceTypes';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';

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
  leftIcon?: string;
  icon?: string;
  index?: number;
  disabled?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  children?: React.ReactNode;
}

export const MenuButton: React.FC<MenuButtonProps> = (props: MenuButtonProps) => {
  const evenColor = Colors.gray900;
  const oddColor = Colors.almostBlack;
  const rowColor = props.index && props.index % 2 !== 0 ? oddColor : evenColor;
  return (
    <TouchableOpacity
      style={[styles.menuButton, props.style, { backgroundColor: rowColor }]}
      disabled={props.disabled}
      onPress={props.onPress}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.leftIcon ? <FAIcon name={props.leftIcon} style={styles.leftIcon} /> : null}
        <Text style={{ ...Buttons.largeButtonText }}>{props.label}</Text>
      </View>

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
      <Image source={{ uri: getGeoFenceImage(props.category) }} style={styles.categoryIcon} />
      <Text style={{ ...Typography.bodyText, fontSize: 10 }}>{props.category.toString()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  basicButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
  },
  disabledButton: {
    ...Buttons.button,
    backgroundColor: Colors.gray500,
    width: '100%',
    marginVertical: Spacing.small,
  },
  leftIcon: {
    ...Buttons.largeButtonText,
    marginRight: Spacing.smaller,
    width: 25,
  },
  buttonIcon: {
    ...Buttons.buttonText,
    paddingLeft: Spacing.small,
  },
  menuButton: {
    padding: Spacing.large,
    backgroundColor: Colors.blue,
    alignItems: 'center' as const,
    marginBottom: Spacing.smaller,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    ...Typography.bodyText,
    borderRadius: Spacing.smaller,
    paddingVertical: Spacing.base,
    width: '23%',
    alignItems: 'center',
    backgroundColor: Colors.gray900,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginVertical: Spacing.smallest,
  },
  isSelected: {
    backgroundColor: Colors.blue,
  },
});
