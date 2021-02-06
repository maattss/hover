import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../../types/navigationTypes';
import Firebase from '../../lib/firebase';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { Asset } from 'expo-asset';

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

  if (loading) return <Loading text={'Logging you in... Please wait'} />;
  else {
    return (
      <View style={styles.container}>
        {/* eslint-disable @typescript-eslint/no-var-requires */}
        <Image
          source={{ uri: Asset.fromModule(require('../../assets/images/adaptive-icon.png')).uri }}
          style={styles.image}
        />
        <Text style={styles.header}>Hover</Text>
        <View style={styles.formContainer}>
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
          />

          <Button onPress={handleLogin}>
            <Text style={{ ...Typography.largeBodyText }}>Log in</Text>
          </Button>
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
    textAlign: 'center',
    width: '85%',
  },
  image: {
    height: 150,
    width: 150,
    marginBottom: -20,
  },
  formContainer: {
    width: '85%',
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
    width: '85%',
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
