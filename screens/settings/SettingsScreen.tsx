import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Firebase from '../../lib/firebase';
import { Buttons, Spacing, Typography, Colors } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../types';

type NavigationProp = StackNavigationProp<SettingsStackParamList>;

export type SettingsProps = {
  navigation: NavigationProp;
};
type Item = {
  id: string;
  title: string;
  onClick?: () => void;
};

const Item = (item: Item) => (
  <TouchableOpacity style={styles.settingsItem} onPress={() => (item.onClick ? item.onClick() : null)}>
    <Text style={{ ...Buttons.buttonText }}>{item.title}</Text>
    <FAIcon name="chevron-right" style={{ ...Buttons.buttonText }} />
  </TouchableOpacity>
);

const SettingsScreen = ({ navigation }: SettingsProps) => {
  const handleLogout = async () => {
    try {
      await Firebase.auth().signOut();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  };
  const SettingMenu: Item[] = [
    {
      id: 'bd7acbea-c1b1-873h-aed5-3ad53ahsj8ba',
      title: 'User Settings',
      onClick: () => navigation.navigate('UserSettings'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Language',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Appearance',
    },
  ];

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
  const renderItem = ({ item }: { item: Item }) => <Item id={item.id} title={item.title} onClick={item.onClick} />;

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <FlatList
          data={SettingMenu}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.settingsList}
        />
      </View>
      <TouchableOpacity style={styles.logOutButton} onPress={areYouSure}>
        <Text style={{ ...Buttons.buttonText }}>Sign out</Text>
      </TouchableOpacity>
      <Text style={{ ...Typography.bodyText }}>Hover Version 0.0.1</Text>
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
  settingsContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  settingsList: {
    width: '100%',
  },
  settingsItem: {
    ...Buttons.button,
    marginBottom: Spacing.smaller,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logOutButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
  logOutButtonText: {
    ...Buttons.buttonText,
  },
});

export default SettingsScreen;
