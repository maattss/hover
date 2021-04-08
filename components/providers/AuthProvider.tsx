import React, { useEffect, useState, ReactNode } from 'react';
import { User } from 'firebase';
import Firebase from '../../lib/firebase';
import * as Analytics from 'expo-firebase-analytics';

interface Props {
  children: ReactNode;
}

interface AuthContextValues {
  user: User | null;
  isLoadingUser: boolean;
}

export const AuthContext = React.createContext<AuthContextValues>({ user: null, isLoadingUser: true });
AuthContext.displayName = 'AuthContext';

export const AuthProvider = ({ children }: Props) => {
  const [userAuthState, setUserAuthState] = useState<User | null>(null);
  const [isLoadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserAuthState(user);
        setLoadingUser(false);
        Analytics.setUserId(user.uid);
      } else {
        setUserAuthState(null);
        setLoadingUser(false);
      }
    });
  }, []);

  const value: AuthContextValues = {
    user: userAuthState,
    isLoadingUser: isLoadingUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
