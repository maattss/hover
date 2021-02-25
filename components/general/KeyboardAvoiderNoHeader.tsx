import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { Colors } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
}
const KeyboardAvoiderNoHeader = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  const getSafeAreaTop = () => {
    return {
      marginTop: insets.top,
    } as ViewStyle;
  };
  const getSafeAreaHeight = () => {
    return {
      height: insets.top,
    } as ViewStyle;
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoider}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={[styles.blackTop, getSafeAreaHeight()]} />
            <View style={getSafeAreaTop()}>{children}</View>
          </View>
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
  blackTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    zIndex: 99,
    backgroundColor: Colors.black,
  },
});

export default KeyboardAvoiderNoHeader;
