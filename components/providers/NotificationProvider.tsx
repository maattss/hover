import React, { useEffect, useState, ReactNode } from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import { useNotifiactionsQuery } from '../../graphql/queries/Notifications.generated';
import { useUpdateNotificationsMutation } from '../../graphql/mutations/UpdateNotifications.generated';
import { NotificationFragmentFragment } from '../../graphql/Fragments.generated';
import { ApolloError } from '@apollo/client';

interface Props {
  children: ReactNode;
}
interface NotificationContextValues {
  count: number;
  notifications?: NotificationFragmentFragment[];
  newNotifications?: NotificationFragmentFragment[];
  earlierNotifications?: NotificationFragmentFragment[];
  notificationsError?: ApolloError;
  readNotifications: () => void;
  refetchNotifications: () => void;
}

export const NotificationContext = React.createContext<NotificationContextValues>({
  count: 0,
  newNotifications: undefined,
  earlierNotifications: undefined,
  notificationsError: undefined,
  readNotifications: () => () => console.error('Function not initialized'),
  refetchNotifications: () => console.error('Function not initialized'),
});

NotificationContext.displayName = 'NotificationContext';

export const NotificationProvider = ({ children }: Props) => {
  const user_id = useAuthentication().user?.uid;
  const [count, setCount] = useState<number>(0);
  const [newNotifications, setNewNotifications] = useState<NotificationFragmentFragment[]>([]);
  const [earlierNotifications, setEarlierNotifications] = useState<NotificationFragmentFragment[]>([]);
  const { data: notificationData, error: notificationsError, refetch: refetchNotifications } = useNotifiactionsQuery({
    fetchPolicy: 'network-only',
  });

  const [readNotifications] = useUpdateNotificationsMutation();
  const readAll = () => {
    if (user_id) readNotifications({ variables: { user_id } });
  };

  useEffect(() => {
    if (notificationData?.notifications) {
      const newest: NotificationFragmentFragment[] = [];
      const earlier: NotificationFragmentFragment[] = [];
      notificationData.notifications.forEach((obj: NotificationFragmentFragment) => {
        if (!obj.seen) newest.push(obj);
        else earlier.push(obj);
      });
      setNewNotifications(newest);
      setEarlierNotifications(earlier);
      setCount(newest.length ?? 0);
    }
    if (notificationsError) {
      console.error(notificationsError.message);
    }
  }, [notificationData, notificationsError]);

  const value: NotificationContextValues = {
    count: count,
    newNotifications: newNotifications,
    earlierNotifications: earlierNotifications,
    notificationsError: notificationsError,
    readNotifications: readAll,
    refetchNotifications: refetchNotifications,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export default NotificationProvider;
