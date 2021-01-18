import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../types/navigationTypes';
import Firebase from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';

const LoginScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={Colors.blue} />
        <Text style={styles.infoText}>Logging you in... Please wait</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
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
  }
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '30%',
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
    backgroundColor: Colors.gray900,
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
