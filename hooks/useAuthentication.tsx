import * as React from 'react';
import { User } from 'firebase';
import Firebase from '../lib/firebase';

const AuthContext = React.createContext<User | null>(null);
AuthContext.displayName = 'AuthContext';

const useAuthentication = () => {
  const authentication = React.useContext(AuthContext);
  return authentication;
};

export default useAuthentication;
