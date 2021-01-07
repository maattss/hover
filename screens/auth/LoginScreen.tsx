import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AuthenticationStackParamList } from '../../types';
import Firebase from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';

const LoginScreen = ({ navigation }: StackScreenProps<AuthenticationStackParamList, 'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.formContainer}>
        <TextInput
          placeholder="Email"
          onChangeText={(val) => setEmail(val)}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.formField}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(val) => setPassword(val)}
          secureTextEntry
          style={styles.formField}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={{ ...Buttons.buttonText, color: Colors.white }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text style={{ ...Typography.bodyText }}>Not a member yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupLink}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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
  loginButton: {
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
  signupLink: {
    ...Typography.bodyText,
    color: Colors.blue,
    marginLeft: Spacing.smallest,
    fontWeight: 'bold',
  },
  signupContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default LoginScreen;
