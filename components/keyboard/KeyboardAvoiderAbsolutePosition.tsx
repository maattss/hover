import React, { ReactNode, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, Animated, KeyboardEventListener, KeyboardEvent } from 'react-native';

interface Props {
  children: ReactNode;
  newBottom?: number;
  transitionDuration?: number;
}

const KeyboardAvoiderAbsolutePosition = ({ children, newBottom, transitionDuration }: Props) => {
  const marginAnimation = useRef(new Animated.Value(0)).current;

  const keyboardWillShow: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(marginAnimation, {
      duration: transitionDuration ? transitionDuration : event.duration,
      toValue: newBottom ? newBottom : event.endCoordinates.height,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(marginAnimation, {
      duration: transitionDuration ? transitionDuration : event.duration,
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
