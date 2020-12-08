import React from 'react';

import { Alert, View, Text, TouchableOpacity } from 'react-native';
import tailwind from 'tailwind-rn';
import Firebase from '../../../lib/firebase';

export default function SettingsScreen() {
  const handleLogout = async () => {
    try {
      await Firebase.auth().signOut();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={tailwind('py-5 px-5 flex-1')}>
      <Text style={tailwind('text-4xl text-center font-bold')}>Settings</Text>
      <TouchableOpacity
        style={tailwind('bg-blue-500 rounded-lg py-3 mt-10')}
        onPress={handleLogout}>
        <Text
          style={tailwind(
            'text-white text-center font-bold text-lg rounded-lg',
          )}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
}
