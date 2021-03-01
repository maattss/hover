import React, { ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-elements';
import { Spacing } from '../../theme';

interface BadgeIconProps {
  value: number;
  children: ReactNode;
  onPress: () => void;
}
const BadgeIcon: React.FC<BadgeIconProps> = ({ value, children, onPress }: BadgeIconProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        {children}
        {value > 0 && <Badge value={value} status={'error'} containerStyle={styles.badgeStyle} />}
      </View>
    </TouchableOpacity>
  );
};

export default BadgeIcon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.small,
    marginRight: Spacing.small,
  },
  text: {
    fontSize: Spacing.base,
  },
  row: {
    flexDirection: 'row',
  },
  badgeStyle: {
    position: 'absolute',
    top: -4,
    right: 10,
  },
});
