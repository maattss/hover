import React from 'react';
import { NotificationContext } from '../components/providers/NotificationProvider';

const useNotification = () => {
  const notification = React.useContext(NotificationContext);
  return notification;
};

export default useNotification;
