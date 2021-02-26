import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { Badge } from 'react-native-elements';
import { Spacing } from '../../theme';

interface BadgeIconProps {
  value: number;
  children: ReactNode;
}
const BadgeIcon: React.FC<BadgeIconProps> = ({ value, children }: BadgeIconProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {children}
        {value > 0 && <Badge value={value} status={'error'} containerStyle={styles.badgeStyle} />}
      </View>
    </View>
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
