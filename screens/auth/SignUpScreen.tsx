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
  ActivityIndicator,
  Button,
} from 'react-native';
import { AuthStackParamList } from '../../types/navigationTypes';
import Firebase, { fns } from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import CustomButton from '../../components/general/Button';
import Loading from '../../components/general/Loading';
import KeyboardAvoiderNoHeader from '../../components/general/KeyboardAvoiderNoHeader';

export const randomPictureURI = () => {
  const random = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return 'https://api.multiavatar.com/' + random + '.png';
};

export const getSanitizedEmail = (name: string) => {
  // Replace everything that is not number or letter with an underscore. And append valid email domain.
  return name.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '@hover.app';
};

const SignUpScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Signup'>) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const [picture, setPicture] = useState(randomPictureURI());

  const validateForm = () => {
    if (name.length < 1) {
      Alert.alert('Username missing', 'Username needs to be filled in.');
      return false;
    } else if (password.length < 8) {
      Alert.alert('Password too short', 'Password needs to be longer than 8 characters.');
      return false;
    } else if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", 'Both passwords need to be equal.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    try {
      const validationSuccess = validateForm();

      if (validationSuccess) {
        setLoading(true);
        // Extract the function into a variable
        const registerUser = fns.httpsCallable('registerUser');
        // Generate email from username.
        const email = getSanitizedEmail(name);
        // Call the function
        await registerUser({ email, password, name, picture });
        // Log the user in
        const newUser = await Firebase.auth().signInWithEmailAndPassword(email, password);
        if (newUser) {
          Alert.alert('Signup success', 'Welcome to Hover!');
        } else {
          throw new Error('Error inserting user data to Hasura on signup.');
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

  if (loading) {
    return (
      <Loading text={'Signing up... Please wait'}>
        <CustomButton style={styles.cancelButton} onPress={handleCancel}>
          Cancel
        </CustomButton>
      </Loading>
    );
  } else {
    return (
      <KeyboardAvoiderNoHeader>
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: picture }}
            style={styles.avatar}
            onLoadStart={() => setLoadingImage(true)}
            onLoadEnd={() => setLoadingImage(false)}
          />
          {loadingImage && <ActivityIndicator style={styles.avatarLoading} color={Colors.blue} />}
          <Button onPress={() => setPicture(randomPictureURI())} title="Regenerate picture" />
        </View>

        <Text style={styles.label}>Username</Text>
        <TextInput
          placeholder="Enter your username"
          placeholderTextColor={Colors.gray600}
          onChangeText={(val) => setName(val)}
          autoCapitalize="words"
          autoCorrect={false}
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
          autoCorrect={false}
          style={styles.formField}
          onSubmitEditing={handleSignup}
        />
        <CustomButton onPress={handleSignup}>Sign up</CustomButton>

        <View style={styles.loginContainer}>
          <Text style={{ ...Typography.bodyText }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoiderNoHeader>
    );
  }
};

const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
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
    marginTop: Spacing.smaller,
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
