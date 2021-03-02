import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { Spacing } from '../../theme';

interface BadgeIconProps {
  value: number;
  children: ReactNode;
  onPress: () => void;
}
const BadgeIcon: React.FC<BadgeIconProps> = ({ value, children, onPress }: BadgeIconProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
      {value > 0 && <Badge value={value} status={'error'} containerStyle={styles.badgeStyle} />}
    </TouchableOpacity>
  );
};

export default BadgeIcon;

const styles = StyleSheet.create({
  badgeStyle: {
    position: 'absolute',
    right: Spacing.small,
  },
});
