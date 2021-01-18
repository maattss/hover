import React, { useEffect, useState, ReactNode } from 'react';
import { User } from '../lib/firebase';
import Firebase from '../lib/firebase';

interface Props {
  children: ReactNode;
}

export const AuthContext = React.createContext<User | null>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: Props) => {
  const [userAuthState, setUserAuthState] = useState<User | null>(null);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => (user ? setUserAuthState(user) : setUserAuthState(null)));
  }, []);

  return <AuthContext.Provider value={userAuthState}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
