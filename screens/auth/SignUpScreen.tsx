import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthenticationStackParamList } from '../../types';
import Firebase, { fns } from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';

const SignUpScreen = ({ navigation }: StackScreenProps<AuthenticationStackParamList, 'Signup'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpInProgress, setSignUpInProgress] = useState(false);

  const handleSignup = async () => {
    setSignUpInProgress(true);
    const [validationSuccess, setvalidationSuccess] = useState(true);
    try {
      if (password !== confirmPassword) setvalidationSuccess(false);

      if (validationSuccess) {
        // Extract the function into a variable
        const registerUser = fns.httpsCallable('registerUser');
        // Call the function
        await registerUser({ email, password });
        // Log the user in
        await Firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        Alert.alert('Error', 'Validation error... Please check your email and that the passwords match');
        setSignUpInProgress(false);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
      setSignUpInProgress(false);
    }
  };

  const handleCancel = () => {
    setSignUpInProgress(false);
  };

  if (signUpInProgress) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
        <Text style={styles.infoText}>Signing up... Please wait</Text>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={{ ...Buttons.buttonText }}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign up</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.formField}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            onChangeText={(val) => setPassword(val)}
            autoCapitalize="none"
            secureTextEntry
            style={styles.formField}
          />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor="black"
            onChangeText={(val) => setConfirmPassword(val)}
            autoCapitalize="none"
            secureTextEntry
            style={styles.formField}
          />
          <TouchableOpacity style={styles.signUpButton} onPress={handleSignup}>
            <Text style={{ ...Buttons.buttonText, color: Colors.white }}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginContainer}>
          <Text style={{ ...Typography.bodyText }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  header: {
    ...Typography.headerText,
    marginBottom: Spacing.base,
    textAlign: 'left',
    width: '80%',
  },
  formContainer: {
    width: '80%',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.small,
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray300,
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  signUpButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
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
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SignUpScreen;
