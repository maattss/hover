import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../types/navigationTypes';
import Firebase, { fns } from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

const SignUpScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Signup'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationSuccess, setvalidationSuccess] = useState(true);

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
        <Text style={styles.header}>Sign up</Text>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={Colors.gray600}
            onChangeText={(val) => setEmail(val)}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.formField}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={Colors.gray600}
            onChangeText={(val) => setPassword(val)}
            autoCapitalize="none"
            secureTextEntry
            style={styles.formField}
          />
          <TextInput
            placeholder="Confirm password"
            placeholderTextColor={Colors.gray600}
            onChangeText={(val) => setConfirmPassword(val)}
            autoCapitalize="none"
            secureTextEntry
            style={styles.formField}
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
