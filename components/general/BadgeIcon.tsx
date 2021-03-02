import React, { ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { Colors, Spacing } from '../../theme';

interface BadgeIconProps {
  value: number;
  children: ReactNode;
  onPress: () => void;
}
const BadgeIcon: React.FC<BadgeIconProps> = ({ value, children, onPress }: BadgeIconProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      {children}
      {value > 0 && (
        <Badge value={value} badgeStyle={styles.badgeStyle} status={'error'} containerStyle={styles.badgeContainer} />
      )}
    </TouchableOpacity>
  );
};

export default BadgeIcon;

const styles = StyleSheet.create({
  badgeContainer: {
    position: 'absolute',
    right: Spacing.small,
  },
  badgeStyle: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
});
