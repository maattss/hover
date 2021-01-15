import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';

export async function alertIfRemoteNotificationsDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    Alert.alert('Hey! You might want to enable notifications for my app, they are good.');
  }
}

export async function alertIfLocationServiceDisabledAsync() {
  const { status } = await Permissions.getAsync(Permissions.LOCATION);
  if (status !== 'granted') {
    Alert.alert('Hey! You might want to enable notifications for my app, they are good.');
  }
}

export async function checkMultiPermissions() {
  alertIfLocationServiceDisabledAsync();
  alertIfRemoteNotificationsDisabledAsync();
}
