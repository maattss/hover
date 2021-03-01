import React from 'react';
import { PushNotificationContext } from '../components/providers/PushNotificationProvider';

const usePushNotification = () => {
  const push = React.useContext(PushNotificationContext);
  return push;
};

export default usePushNotification;
