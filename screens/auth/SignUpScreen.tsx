import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  ViewStyle,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { RootStackParamList } from '../../types/navigationTypes';
import Firebase, { fns } from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Asset } from 'expo-asset';

const SignUpScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Signup'>) => {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [validationSuccess, setvalidationSuccess] = useState(true);

  const randomPictureURI = () => {
    const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return 'https://api.multiavatar.com/' + random + '.png';
  };
  const [picture, setPicture] = useState(randomPictureURI());

  const handleSignup = async () => {
    setLoading(true);
    try {
      if (password !== confirmPassword) setvalidationSuccess(false);
      if (validationSuccess) {
        // Extract the function into a variable
        const registerUser = fns.httpsCallable('registerUser');
        // Call the function
        await registerUser({ email, password });
        // Log the user in
        await Firebase.auth().signInWithEmailAndPassword(email, password);
        // TODO:
        // Add user to hasura db
        Alert.alert('Signup success');
      } else {
        Alert.alert('Something wrong...', 'Please check your email, and that both passwords match!');
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLoading(false);
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

  if (loading) {
    return (
      <Loading text={'Signing up... Please wait'}>
        <Button style={styles.cancelButton} onPress={handleCancel}>
          Cancel
        </Button>
      </Loading>
    );
  } else {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <View style={[styles.blackTop, getSafeAreaHeight()]} />
              <View style={[styles.formContainer, getSafeAreaTop()]}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={{ uri: picture }}
                    style={styles.avatar}
                    onLoadStart={() => setLoadingImage(true)}
                    onLoadEnd={() => setLoadingImage(false)}
                  />
                  {loadingImage && <ActivityIndicator style={styles.avatarLoading} color={Colors.blue} />}
                </View>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor={Colors.gray600}
                  onChangeText={(val) => setName(val)}
                  style={styles.formField}
                />
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  placeholder="Enter your e-mail"
                  placeholderTextColor={Colors.gray600}
                  onChangeText={(val) => setEmail(val)}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.formField}
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                  placeholder="Enter your password"
                  placeholderTextColor={Colors.gray600}
                  onChangeText={(val) => setPassword(val)}
                  autoCapitalize="none"
                  secureTextEntry
                  autoCorrect={false}
                  style={styles.formField}
                />
                <Text style={styles.label}>Confirm password</Text>
                <TextInput
                  placeholder="Confirm your password"
                  placeholderTextColor={Colors.gray600}
                  onChangeText={(val) => setConfirmPassword(val)}
                  autoCapitalize="none"
                  secureTextEntry
                  style={styles.formField}
                />
                <Button onPress={handleSignup}>Sign up</Button>
                <View style={styles.loginContainer}>
                  <Text style={{ ...Typography.bodyText }}>Already have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLink}>Login</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
  },
  inner: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  blackTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 98,
    backgroundColor: Colors.black,
  },
  signUpContainer: {
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
    width: '85%',
  },
  formContainer: {
    width: '85%',
  },
  avatarContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: Spacing.small,
    backgroundColor: Colors.white,
  },
  avatarLoading: {
    position: 'absolute',
    top: 50,
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.small,
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray900,
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  cancelButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
    width: '60%',
    marginTop: Spacing.largest,
    marginBottom: Spacing.base,
  },
  loginLink: {
    ...Typography.bodyText,
    color: Colors.blue,
    marginLeft: Spacing.smallest,
    fontWeight: 'bold',
    backgroundColor: 'green',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});

export default SignUpScreen;
