import React, { ReactNode, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, Animated, KeyboardEventListener, KeyboardEvent } from 'react-native';

interface Props {
  children: ReactNode;
  customMargin?: number;
  customTransitionDuration?: number;
}

const KeyboardAvoiderAbsolutePosition = ({ children, customMargin, customTransitionDuration }: Props) => {
  const marginAnimation = useRef(new Animated.Value(0)).current;

  const keyboardWillShow: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(marginAnimation, {
      duration: customTransitionDuration ? customTransitionDuration : event.duration,
      toValue: customMargin ? customMargin : event.endCoordinates.height,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(marginAnimation, {
      duration: customTransitionDuration ? customTransitionDuration : event.duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    Keyboard.addListener('keyboardWillHide', keyboardWillHide);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={{ bottom: marginAnimation }}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoiderAbsolutePosition;
