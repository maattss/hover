import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  Dimensions,
  ViewStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { AuthStackParamList } from '../../types/navigationTypes';
import Firebase from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { Asset } from 'expo-asset';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };
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
  if (loading) return <Loading text={'Logging you in... Please wait'} />;
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={[styles.blackTop, getSafeAreaHeight()]} />
            <View>
              <View style={[styles.hover, getSafeAreaTop()]}>
                {/* eslint-disable @typescript-eslint/no-var-requires */}
                <Image
                  source={{ uri: Asset.fromModule(require('../../assets/images/adaptive-icon.png')).uri }}
                  style={styles.image}
                />
                <Text style={styles.header}>Hover</Text>
              </View>

              <Text style={styles.label}>E-mail</Text>
              <TextInput
                placeholder="Enter your e-mail"
                placeholderTextColor={Colors.gray600}
                onChangeText={(val) => setEmail(val)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                style={styles.formField}
              />
              <Text style={styles.label}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={Colors.gray600}
                onChangeText={(val) => setPassword(val)}
                secureTextEntry
                style={styles.formField}
                onSubmitEditing={handleLogin}
              />

              <Button onPress={handleLogin}>Log in</Button>

              <View style={styles.signupContainer}>
                <Text style={{ ...Typography.bodyText }}>Not a member yet?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
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
    padding: Spacing.small,
  },
  hover: {
    alignItems: 'center',
    paddingTop: Spacing.largest,
  },
  header: {
    ...Typography.headerText,
    marginBottom: Spacing.base,
  },
  blackTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    zIndex: 99,
    backgroundColor: Colors.black,
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: -20,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray900,
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  signupLink: {
    ...Typography.bodyText,
    color: Colors.blue,
    marginLeft: Spacing.smallest,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LoginScreen;
