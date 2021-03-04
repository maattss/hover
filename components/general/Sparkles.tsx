import React, { ReactNode, useEffect } from 'react';
import { Animated, StyleSheet, View, ViewStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { generateSparkle, range, SparkleType, useRandomInterval } from '../../helpers/sparkleHelpers';
import { Colors } from '../../theme';

type SparkleProps = {
  children: ReactNode;
};

const Sparkles: React.FC<SparkleProps> = ({ children }: SparkleProps) => {
  const [sparkles, setSparkles] = React.useState<SparkleType[]>(() => {
    return range(0, 2).map(() => generateSparkle());
  });

  useRandomInterval(
    () => {
      const now = Date.now();
      const sparkle = generateSparkle();
      const nextSparkles = sparkles.filter((spark) => {
        const delta = now - spark.createdAt;
        return delta < 900;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    100,
    450,
  );
  return (
    <View style={styles.wrapper}>
      <View style={styles.childWrapper}>{children}</View>
      <View style={styles.sparkleOverlayWrapper}>
        <View style={styles.sparkleWrapper}>
          {sparkles.map((sparkle) => (
            <SparkleInstance key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
          ))}
        </View>
      </View>
    </View>
  );
};
export default Sparkles;

type SparkleInstanceProps = {
  color: string;
  size: number;
  style: ViewStyle;
};

const SparkleInstance: React.FC<SparkleInstanceProps> = ({ size, color, style }: SparkleInstanceProps) => {
  const sparkleRotation = new Animated.Value(0);
  const sparkleOpacity = new Animated.Value(0);

  const animateSparkle = () => {
    sparkleRotation.setValue(0);
    sparkleOpacity.setValue(0);
    Animated.loop(
      Animated.parallel([
        Animated.timing(sparkleRotation, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleOpacity, {
          toValue: 2,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  };

  const interpolateRotation = sparkleRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const interpolateScale = sparkleOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    animateSparkle();
  }, []);

  return (
    <View style={[styles.sparkle, style]}>
      <Animated.View
        style={[{ transform: [{ rotate: interpolateRotation }, { scale: interpolateScale }, { perspective: 1000 }] }]}>
        <Svg height={size} width={size} viewBox="0 0 160 160">
          <Path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill={color}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  sparkleOverlayWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  sparkleWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  sparkle: {
    position: 'absolute',
  },
  childWrapper: {
    position: 'relative',
  },
});
