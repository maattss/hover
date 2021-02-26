import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';

interface Props {
  children: ReactNode;
}
const KeyboardAvoider = ({ children }: Props) => {
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoider}
        keyboardVerticalOffset={64}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>{children}</View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
  },
  inner: {
    justifyContent: 'flex-end',
  },
  keyboardAvoider: {
    flex: 1,
  },
});

export default KeyboardAvoider;
