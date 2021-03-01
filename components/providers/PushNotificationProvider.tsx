import React, { useEffect, useState, useRef, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendPushNotification } from '../../helpers/pushNotifications';
import { Subscription } from '@unimodules/core';

interface Props {
  children: ReactNode;
}

interface PushNotificationContextValues {
  token: string | undefined;
  notification: Notifications.Notification | undefined;
  sendPushNotification: () => void;
}

export const PushNotificationContext = React.createContext<PushNotificationContextValues>({
  token: undefined,
  notification: undefined,
  sendPushNotification: () => console.error('Function not initialized'),
});

PushNotificationContext.displayName = 'PushNotificationContext';

export const PushNotificationProvider = ({ children }: Props) => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
      console.log(notification);
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

  const value: PushNotificationContextValues = {
    token: expoPushToken,
    notification: notification,
    sendPushNotification: sendPushNotification,
  };

  return <PushNotificationContext.Provider value={value}>{children}</PushNotificationContext.Provider>;
};

export default PushNotificationProvider;
