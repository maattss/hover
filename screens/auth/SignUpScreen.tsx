import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { AuthenticationStackParamList } from '../../types';
import Firebase, { fns } from '../../lib/firebase';
import { Colors, Spacing, Typography } from '../../theme';

const SignUpScreen = ({ navigation }: StackScreenProps<AuthenticationStackParamList, 'Signup'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpInProgress, setSignUpInProgress] = useState(false);

  const handleSignup = async () => {
    setSignUpInProgress(true);
    try {
      /* TODO: Password validation and check that passwords match */
      // Extract the function into a variable
      const registerUser = fns.httpsCallable('registerUser');
      // Call the function
      await registerUser({ email, password });
      // Log the user in
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    } finally {
      setSignUpInProgress(true);
    }
  };

  if (signUpInProgress) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
        <Text style={styles.infoText}>Signing you in... Please wait</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={{ ...Typography.headerText }}>Sign up</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="black"
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            style={styles.formField}
            underlineColorAndroid={'blue'}
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
            placeholder="Repeat your password"
            placeholderTextColor="black"
            onChangeText={(val) => setPassword(val)}
            autoCapitalize="none"
            secureTextEntry
            style={styles.formField}
          />
          <TouchableOpacity style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')} onPress={handleSignup}>
            <Text style={tailwind('text-white text-center font-bold text-lg')}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <View style={tailwind('mt-2 flex-row justify-center')}>
          <Text>Already have an account?</Text>
          <TouchableOpacity style={tailwind('ml-1')} onPress={() => navigation.navigate('Login')}>
            <Text style={tailwind('text-blue-500')}>Login</Text>
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
  formContainer: {
    width: '80%',
  },
  formField: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.base,
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
});

export default SignUpScreen;
