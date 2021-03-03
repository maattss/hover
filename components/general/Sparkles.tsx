import React, { ReactNode, useEffect } from 'react';
import { Animated, Easing, StyleSheet, View, ViewStyle } from 'react-native';
import { Colors } from '../../theme';
import Svg, { Path } from 'react-native-svg';
import { random, range, useRandomInterval } from '../../helpers/sparkleHelpers';

type SparkleProps = {
  children: ReactNode;
};

const Sparkles: React.FC<SparkleProps> = ({ children }: SparkleProps) => {
  const [sparkles, setSparkles] = React.useState<SparkleType[]>(() => {
    return range(0, 6).map(() => generateSparkle());
  });

  useRandomInterval(
    () => {
      const now = Date.now();
      // Create a new sparkle
      const sparkle = generateSparkle();
      // Clean up any "expired" sparkles
      const nextSparkles = sparkles.filter((spark) => {
        const delta = now - spark.createdAt;
        return delta < 1000;
      });
      // Include our new sparkle
      nextSparkles.push(sparkle);
      // Make it so!
      setSparkles(nextSparkles);
    },
    50,
    450,
  );
  return (
    <View style={styles.wrapper}>
      <View style={styles.childwrapper}>{children}</View>
      {sparkles.map((sparkle) => (
        <SparkleInstance key={sparkle.id} color={sparkle.color} size={sparkle.size} style={sparkle.style} />
      ))}
    </View>
  );
};
export default Sparkles;

type SparkleInstanceProps = {
  color: string;
  size: number;
  style: ViewStyle;
};

const SparkleInstance: React.FC<SparkleInstanceProps> = (props: SparkleInstanceProps) => {
  const sparkleRotation = new Animated.Value(0);
  const sparkleOpacity = new Animated.Value(0);

  const animateSparkle = () => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(sparkleRotation, {
          toValue: 1,
          duration: 3300,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(sparkleOpacity, {
          toValue: 1,
          duration: 330,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]),
      Animated.parallel([
        Animated.timing(sparkleRotation, {
          toValue: 2,
          duration: 330,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(sparkleOpacity, {
          toValue: 2,
          duration: 330,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]),
    ]).start(); // start the sequence group
  };

  const interpolateRotation = sparkleRotation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '90deg', '360deg'],
  });
  const interpolateScale = sparkleOpacity.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  const ballRotationStyle = { transform: [{ rotate: interpolateRotation }] };
  const ballOpacityStyle = { transform: [{ scale: interpolateScale }] };

  useEffect(() => {
    animateSparkle();
  }, []);
  return (
    <View style={styles.explosionBoundary}>
      <Animated.View style={[ballRotationStyle, ballOpacityStyle]}>
        <Svg height={props.size} width={props.size} viewBox="0 0 160 160" {...props}>
          <Path
            d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
            fill={props.color}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  svg: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  explosionBoundary: {
    position: 'absolute',
  },
  childwrapper: {
    position: 'relative',
  },
});

type SparkleType = {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: ViewStyle;
};
const DEFAULT_COLOR = Colors.gold;
const generateSparkle = (color: string = DEFAULT_COLOR): SparkleType => {
  return {
    id: String(random(100, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: { top: random(0, 100) + '%', left: random(0, 100) + '%', zIndex: 2 },
  } as SparkleType;
};
