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
      Analytics.logEvent('push_notification_event', {
        user: id,
        action: 'received_in_foreground',
        purpose: 'User received push notification.',
      });
      if (notification.request.content.title === 'Hi there! I see you are inside a Hover zone') {
        Analytics.logEvent('PN_inside_geofence_received_foreground', {
          event: 'received_in_foreground',
          purpose: 'User receives inside geofence push notification while app in foreground.',
        });
      }
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response: NotificationResponse) => {
        console.log(response);
        Analytics.logEvent('push_notification_event', {
          user: id,
          action: 'open',
          purpose: 'User opens push notification.',
        });
        if (response.notification.request.content.title === 'Hi there! I see you are inside a Hover zone') {
          Analytics.logEvent('PN_inside_geofence_open', {
            event: 'open',
            purpose: 'User opens inside geofence push notification.',
          });
        }
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
