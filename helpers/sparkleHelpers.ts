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

export const range = (start = 0, end: number, step = 1) => {
  const output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
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
    id: String(random(100, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 80),
    style: {
      top: random(0, 80) + '%',
      left: random(0, 80) + '%',
      zIndex: 7,
    },
  } as SparkleType;
  return sparkle;
};
