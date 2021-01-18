import React from 'react';
import { AuthContext } from '../components/AuthProvider';

const useAuthentication = () => {
  const authentication = React.useContext(AuthContext);
  return authentication;
};

export default useAuthentication;
