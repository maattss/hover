import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import { Spacing, Typography } from '../../theme';

interface StreakProps {
  streak: number;
}
const Streak: React.FC<StreakProps> = ({ streak }: StreakProps) => {
  return (
    <View style={styles.streakContainer}>
      <Image
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        source={{ uri: Asset.fromModule(require('../../assets/images/fire.png')).uri }}
        style={styles.streakIcon}
      />
      <Text style={{ ...Typography.bodyText }}>{streak}</Text>
    </View>
  );
};

export default Streak;

const styles = StyleSheet.create({
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  streakIcon: {
    height: 20,
    width: 20,
    marginRight: Spacing.smallest,
  },
});
