import React, { useEffect, useState, useRef, ReactNode } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync, sendPushNotification } from '../../helpers/pushNotifications';
import { Subscription } from '@unimodules/core';
import { useUpdateUserPushTokenMutation } from '../../graphql/mutations/UpdateUserPushToken.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { storePushToken } from '../../helpers/storage';
import * as Analytics from 'expo-firebase-analytics';
import { NotificationResponse } from 'expo-notifications';

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
  const id = useAuthentication().user?.uid;
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [updateUserPushNotification] = useUpdateUserPushTokenMutation();

  useEffect(() => {
    if (id && expoPushToken !== '') {
      try {
        const push_token = expoPushToken;

        updateUserPushNotification({
          variables: {
            id,
            push_token,
          },
        });
        storePushToken(expoPushToken);
        console.log("Added push notification token '" + expoPushToken + "'");
      } catch (error) {
        console.error(error.message);
      }
    }
  }, [id, expoPushToken]);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token ?? ''));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response: NotificationResponse) => {
        console.log(response);
        Analytics.logEvent('notification_open_event', {
          user: id,
          purpose: 'Count number of times a user opens the app when push notification is received.',
        });
      },
    );

    return () => {
      if (notificationListener.current) Notifications.removeNotificationSubscription(notificationListener.current);
      if (responseListener.current) Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const notify = (title: string, body: string, sound: boolean) =>
    sendPushNotification(expoPushToken, title, body, sound, true);

  const value: PushNotificationContextValues = {
    token: expoPushToken,
    notification: notification,
    sendPushNotification: notify,
  };

  return <PushNotificationContext.Provider value={value}>{children}</PushNotificationContext.Provider>;
};

export default PushNotificationProvider;
