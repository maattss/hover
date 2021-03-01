import React, { useEffect, useState, useRef, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendPushNotification } from '../../helpers/pushNotifications';
import { Subscription } from '@unimodules/core';
import { useUpdateUserPushTokenMutation } from '../../graphql/mutations/UpdateUserPushToken.generated';
import useAuthentication from '../../hooks/useAuthentication';

interface Props {
  children: ReactNode;
}

interface PushNotificationContextValues {
  token: string | undefined;
  notification: Notifications.Notification | undefined;
  sendPushNotification: (title: string, body: string, sound: boolean) => Promise<void>;
}

export const PushNotificationContext = React.createContext<PushNotificationContextValues>({
  token: undefined,
  notification: undefined,
  sendPushNotification: () => new Promise(() => console.error('Function not initialized')),
});

PushNotificationContext.displayName = 'PushNotificationContext';

export const PushNotificationProvider = ({ children }: Props) => {
  const auth = useAuthentication();
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [updateUserPushNotification] = useUpdateUserPushTokenMutation();

  const updateTokenInDb = () => {
    const id = auth.user?.uid;
    const push_token = expoPushToken;
    try {
      if (id === undefined) throw Error('Missing user id...');
      if (push_token !== '') throw Error('Missing push token...');

      updateUserPushNotification({
        variables: {
          id,
          push_token,
        },
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token ?? '');
      updateTokenInDb();
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const notify = (title: string, body: string, sound: boolean) =>
    sendPushNotification(expoPushToken, title, body, sound);

  const value: PushNotificationContextValues = {
    token: expoPushToken,
    notification: notification,
    sendPushNotification: notify,
  };

  return <PushNotificationContext.Provider value={value}>{children}</PushNotificationContext.Provider>;
};

export default PushNotificationProvider;
