import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Firebase from '../../lib/firebase';
import { useTheme } from '../../theme/ThemeProvider';
import { Buttons, Spacing, Typography } from '../../theme';
import { red } from '../../theme/colors';

const DATA: Item[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type Item = {
  id: string;
  title: string;
};

const Item = (item: Item) => (
  <View style={styles.logOutButton}>
    <Text style={styles.logOutButtonText}>{item.title}</Text>
  </View>
);

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
  const renderItem = ({ item }: { item: Item }) => <Item id={item.id} title={item.title} />;

  return (
    <View style={styles.container}>
      <FlatList data={DATA} renderItem={renderItem} keyExtractor={(item) => item.id} />
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
