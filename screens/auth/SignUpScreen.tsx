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
  TouchableWithoutFeedback,
} from 'react-native';
import { AuthStackParamList } from '../../types/navigationTypes';
import Firebase, { fns } from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUpdateUserSignUpMutation } from '../../graphql/mutations/UpdateUserSignUp.generated';

const SignUpScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Signup'>) => {
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
  const [picture] = useState(randomPictureURI());

  const [updateUserSignUp] = useUpdateUserSignUpMutation();

  const handleSignup = async () => {
    setLoading(true);
    try {
      // Validation rules
      if (name.length < 1) {
        setvalidationSuccess(false);
        Alert.alert('Name missing', 'Name needs to be filled in.');
      } else if (email.length < 1) {
        setvalidationSuccess(false);
        Alert.alert('E-mail missing', 'E-mail needs to be filled in.');
      } else if (!email.includes('@')) {
        setvalidationSuccess(false);
        Alert.alert('Invalid e-mail', 'E-mail needs to be valid.');
      } else if (password.length < 8) {
        setvalidationSuccess(false);
        Alert.alert('Password too short', 'Password needs to be longer than 8 characters.');
      } else if (password !== confirmPassword) {
        setvalidationSuccess(false);
        Alert.alert("Passwords don't match", 'Both passwords need to be equal. Please try again.');
      }

      if (validationSuccess) {
        // Extract the function into a variable
        const registerUser = fns.httpsCallable('registerUser');
        // Call the function
        await registerUser({ email, password });
        // Log the user in
        const newUser = await Firebase.auth().signInWithEmailAndPassword(email, password);
        // Add user name and picture to Hasura DB
        const id = newUser.user?.uid;
        if (id) {
          updateUserSignUp({
            variables: {
              id,
              name,
              picture,
            },
          });
          Alert.alert('Signup success', 'Welcome to Hover!');
        } else {
          throw new Error('Error updating user data to Hasura');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    } finally {
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
              <View>
                <View style={[styles.avatarContainer, getSafeAreaTop()]}>
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
                  placeholder="Enter your password (at least 8 characters)"
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
                  onSubmitEditing={handleSignup}
                />
                <Button onPress={handleSignup}>Sign up</Button>
              </View>
              <View style={styles.loginContainer}>
                <Text style={{ ...Typography.bodyText }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
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
    padding: Spacing.small,
  },
  blackTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
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
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  avatarLoading: {
    position: 'absolute',
    top: 50,
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
  loginLink: {
    ...Typography.bodyText,
    color: Colors.blue,
    marginLeft: Spacing.smallest,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
    marginTop: Spacing.largest,
    marginBottom: Spacing.base,
    width: '60%',
  },
});

export default SignUpScreen;
