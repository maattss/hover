import React from 'react';
import { GeoFenceCategory } from '../types/geoFenceTypes';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../theme';
import { getCategoryColor, getCategoryIconName } from '../helpers/categoryHelpers';

interface CategoryIconProps {
  category: GeoFenceCategory;
  style?: ViewStyle;
}
export const CategoryIcon: React.FC<CategoryIconProps> = (props: CategoryIconProps) => {
  const icon = getCategoryIconName(props.category);
  const categoryColor = {
    color: getCategoryColor(props.category),
  };
  return <FAIcon name={icon} style={[styles.categoryIcon, categoryColor]} />;
};

const styles = StyleSheet.create({
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 36,
    textAlign: 'center',
    paddingRight: Spacing.smallest,
  },
});
