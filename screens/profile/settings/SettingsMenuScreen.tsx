import React from 'react';
import { Alert, View, StyleSheet, FlatList } from 'react-native';
import Firebase from '../../../lib/firebase';
import { Buttons, Spacing, Colors } from '../../../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsNavigationStackParamList } from '../../../types/navigationTypes';
import Button, { MenuButton } from '../../../components/Button';

type NavigationProp = StackNavigationProp<SettingsNavigationStackParamList>;

export type SettingsProps = {
  navigation: NavigationProp;
};
type Item = {
  id: string;
  title: string;
  disabled: boolean;
  onClick?: () => void;
};

const Item = (item: Item) => (
  <MenuButton
    style={item.disabled ? styles.settingsItemDisabled : styles.settingsItem}
    onPress={() => (item.onClick ? item.onClick() : null)}
    disabled={item.disabled}
    label={item.title}
    icon="chevron-right"
  />
);

const SettingsScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
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
      disabled: false,
      onClick: () => navigation.navigate('User Settings'),
    },
    {
      id: 'bd78heea-c1b1-873h-aed5-3hjsnahsj8ba',
      title: 'About',
      disabled: false,
      onClick: () => navigation.navigate('About'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Language (not implemented)',
      disabled: true,
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Appearance (not implemented)',
      disabled: true,
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
  const renderItem = ({ item }: { item: Item }) => (
    <Item id={item.id} title={item.title} disabled={item.disabled} onClick={item.onClick} />
  );

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
      <Button style={{ backgroundColor: Colors.red }} onPress={areYouSure}>
        Sign out
      </Button>
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
    backgroundColor: Colors.gray900,
  },
  settingsItemDisabled: {
    display: 'none',
  },
});

export default SettingsScreen;
