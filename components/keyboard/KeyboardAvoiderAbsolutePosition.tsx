import React, { ReactNode, useEffect, useRef } from 'react';
import { Keyboard, TouchableWithoutFeedback, Animated, KeyboardEventListener, KeyboardEvent } from 'react-native';

interface Props {
  children: ReactNode;
}
const KeyboardAvoiderAbsolutePosition = ({ children }: Props) => {
  const marginAnimation = useRef(new Animated.Value(0)).current;

  const keyboardWillShow: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(marginAnimation, {
      duration: event.duration,
      toValue: event.endCoordinates.height,
      useNativeDriver: false,
    }).start();
  };

  const keyboardWillHide: KeyboardEventListener = (event: KeyboardEvent) => {
    Animated.timing(marginAnimation, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardWillShow);
    Keyboard.addListener('keyboardDidHide', keyboardWillHide);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Animated.View style={{ paddingBottom: marginAnimation }}>{children}</Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardAvoiderAbsolutePosition;
