import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

export const sendPushNotification = async (
  expoPushToken: string,
  title: string,
  body: string,
  sound: boolean,
  displayInForeground: boolean,
) => {
  // Message fields: https://docs.expo.io/push-notifications/sending-notifications/#message-request-format
  const message = {
    to: expoPushToken,
    sound: sound ? 'default' : null,
    title: title,
    body: body,
    ios: { _displayInForeground: displayInForeground },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      Alert.alert(
        'Push notifications disabled',
        'Please enable push notifications in the settings for the applications to work properly. ' +
          'We will not spam you with unimportant notifications.',
      );
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    console.log('Push notifications disabled. Must use physical device for this feature.');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
};
