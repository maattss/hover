import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { AuthStackParamList } from '../../types/navigationTypes';
import Firebase from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/general/Button';
import Loading from '../../components/general/Loading';
import { Asset } from 'expo-asset';
import KeyboardAvoiderNoHeader from '../../components/general/KeyboarAvoiderNoHeader';
import { getSanitizedEmail } from './SignUpScreen';

const LoginScreen = ({ navigation }: StackScreenProps<AuthStackParamList, 'Login'>) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      await Firebase.auth().signInWithEmailAndPassword(getSanitizedEmail(name), password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };

  if (loading) return <Loading text={'Logging you in... Please wait'} />;
  return (
    <KeyboardAvoiderNoHeader>
      <View style={styles.hover}>
        {/* eslint-disable @typescript-eslint/no-var-requires */}
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/images/adaptive-icon.png')).uri }}
          style={styles.image}
        />
        <Text style={styles.header}>Hover</Text>
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
    </KeyboardAvoiderNoHeader>
  );
};

const styles = StyleSheet.create({
  hover: {
    alignItems: 'center',
    paddingTop: Spacing.largest,
  },
  header: {
    ...Typography.headerText,
    marginBottom: Spacing.base,
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
    marginTop: Spacing.smaller,
  },
});

export default LoginScreen;
