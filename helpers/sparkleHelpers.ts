import { useCallback, useEffect, useRef } from 'react';
import { ViewStyle } from 'react-native';
import { Colors } from '../theme';
// Utility helper for random number generation
export const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
export const useRandomInterval = (callback: () => void, minDelay: number, maxDelay: number) => {
  const timeoutId = useRef<number>();
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    const isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number';
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => window.clearTimeout(timeoutId.current);
  }, [minDelay, maxDelay]);
  const cancel = useCallback(() => {
    window.clearTimeout(timeoutId.current);
  }, []);
  return cancel;
};

export const range = (size: number) => {
  const output: number[] = [];
  Array(size).forEach((_, index) => output.push(index));
  return output;
};

export type SparkleType = {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: ViewStyle;
};

const DEFAULT_COLOR = Colors.gold;
export const generateSparkle = (color: string = DEFAULT_COLOR): SparkleType => {
  const sparkle = {
    id: '' + random(1, Number.MAX_SAFE_INTEGER) + '-' + random(1, Number.MAX_SAFE_INTEGER),
    createdAt: Date.now(),
    color,
    size: random(50, 100),
    style: {
      position: 'absolute',
      top: -50 + random(0, 50) + '%',
      left: -20 + random(0, 50) + '%',
    },
  } as SparkleType;
  return sparkle;
};
