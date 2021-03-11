import React from 'react';
import { Alert, View, StyleSheet, FlatList } from 'react-native';
import Firebase from '../../../lib/firebase';
import { Buttons, Spacing, Colors, Typography } from '../../../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsNavigationStackParamList } from '../../../types/navigationTypes';
import Button, { MenuButton } from '../../../components/general/Button';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

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
      title: 'Edit Profile',
      disabled: false,
      onClick: () => navigation.navigate('Edit Profile'),
    },
    {
      id: 'bd7acbea-c1b1-jk34-aed5-3ad5hj70j8ba',
      title: 'Suggest New Location',
      disabled: false,
      onClick: () => navigation.navigate('SuggestGeofence'),
    },
    {
      id: '3jhacbea-c1b1-873h-aed5-3ad8hshsj8ba',
      title: 'Give Feedback',
      disabled: false,
      onClick: () => navigation.navigate('Feedback'),
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Privacy Policy',
      disabled: false,
      onClick: () => navigation.navigate('Privacy Policy'),
    },
    {
      id: 'bd78heea-c1b1-873h-aed5-3hjsnahsj8ba',
      title: 'About Hover',
      disabled: false,
      onClick: () => navigation.navigate('About Hover'),
    },
  ];

  const areYouSure = () =>
    Alert.alert(
      'Are you sure?',
      'You will be signed out of your account.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Sign out', style: 'destructive', onPress: handleLogout },
      ],
      { cancelable: false },
    );
  const renderItem = ({ item }: { item: Item }) => (
    <Item id={item.id} title={item.title} disabled={item.disabled} onClick={item.onClick} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <View style={styles.iconRound}>
          <FAIcon name={'cog'} style={styles.icon} />
        </View>
      </View>

      <FlatList
        data={SettingMenu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.settingsList}
        scrollEnabled={false}
      />

      <Button style={styles.logoutButton} onPress={areYouSure}>
        Sign out
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.smaller,
    width: '100%',
    alignItems: 'center',
  },
  settingsList: {
    width: '100%',
  },
  iconContainer: {
    marginBottom: Spacing.base,
  },
  iconRound: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: 120,
    height: 120,
    backgroundColor: Colors.gray900,
  },
  icon: {
    ...Typography.icon,
    margin: Spacing.large,
    fontSize: 60,
  },
  settingsItem: {
    ...Buttons.button,
    marginBottom: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray900,
  },
  settingsItemDisabled: {
    display: 'none',
  },
  logoutButton: {
    backgroundColor: Colors.red,
    marginTop: Spacing.base,
  },
});

export default SettingsScreen;
