import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import tailwind from 'tailwind-rn';
import { AuthenticationStackParamList } from '../../types';

import Firebase, { fns } from '../../lib/firebase';

const SignUpScreen = ({ navigation }: StackScreenProps<AuthenticationStackParamList, 'Signup'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      /* Do some sort of validation before this
      Think password length and so on */
      // Extract the function into a variable
      const registerUser = fns.httpsCallable('registerUser');
      // Call the function
      await registerUser({ email, password });
      // Log the user in
      await Firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={tailwind('pb-20 px-5 flex-1 justify-center')}>
      <Text style={tailwind('text-4xl font-bold')}>Sign up</Text>

      <View style={tailwind('mt-8')}>
        <TextInput
          placeholder="Email"
          onChangeText={(val) => setEmail(val)}
          autoCapitalize="none"
          style={tailwind('text-xl border-b-2 border-blue-500')}
        />
        <TextInput
          placeholder="Password"
          onChangeText={(val) => setPassword(val)}
          autoCapitalize="none"
          secureTextEntry
          style={tailwind('text-xl border-b-2 border-blue-500 mt-8')}
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
};

export default SignUpScreen;
