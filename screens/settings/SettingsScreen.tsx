import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import Firebase from '../../lib/firebase';
import { useTheme } from '../../theme/ThemeProvider';
import { Buttons, Spacing, Typography } from '../../theme';
import { red } from '../../theme/colors';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const handleLogout = async () => {
    try {
      await Firebase.auth().signOut();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  const areYouSure = () =>
    Alert.alert(
      'Are you Sure?',
      'You will be signed out of your account.',
      [
        {
          text: 'Cancel',
        },
        { text: 'Sign out', onPress: () => handleLogout() },
      ],
      { cancelable: false },
    );
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logOutButton} onPress={areYouSure}>
        <Text style={{ ...Buttons.buttonText }}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: Spacing.large,
    paddingRight: Spacing.large,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small,
  },
  logOutButton: {
    ...Buttons.button,
    backgroundColor: red,
    width: '90%',
    alignItems: 'center',
  },
  logOutButtonText: {
    ...Buttons.buttonText,
  },
});

export default SettingsScreen;
