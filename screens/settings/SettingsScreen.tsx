import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Buttons, Spacing, Typography, red, Colors } from '../../theme';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const DATA: Item[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Language',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Appearance',
  },
];

type Item = {
  id: string;
  title: string;
};

const Item = (item: Item) => (
  <TouchableOpacity style={styles.settingsItem}>
    <Text style={{ ...Buttons.buttonText }}>{item.title}</Text>
    <FAIcon name="chevron-right" style={{ ...Buttons.buttonText }} />
  </TouchableOpacity>
);

const SettingsScreen = () => {
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
  const renderItem = ({ item }: { item: Item }) => <Item id={item.id} title={item.title} />;

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} style={styles.settingsList} />
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
