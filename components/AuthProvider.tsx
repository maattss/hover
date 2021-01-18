import React, { useEffect, useState, ReactNode } from 'react';
import { User } from '../lib/firebase';
import Firebase from '../lib/firebase';

interface Props {
  children: ReactNode;
}

interface AuthContextValues {
  user: User | null;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextValues>({ user: null, loading: true });
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: Props) => {
  const [userAuthState, setUserAuthState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserAuthState(user);
        setLoading(false);
      } else {
        setUserAuthState(null);
        setLoading(false);
      }
    });
  }, []);

  const value: AuthContextValues = {
    user: userAuthState,
    loading: loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
