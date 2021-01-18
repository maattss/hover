import React, { useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase';
import Firebase from '../lib/firebase';

interface Props {
  children: ReactNode;
}

export const AuthContext = React.createContext<User | null>(null);
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => (user ? setUser(user) : setUser(null)));
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
