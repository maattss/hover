import React, { useEffect, useState, ReactNode } from 'react';
import { User } from '../lib/firebase';
import Firebase from '../lib/firebase';

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
    const loadDataAsync = async () => {
      await Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setUserAuthState(user);
          setLoadingUser(false);
        } else {
          setUserAuthState(null);
          setLoadingUser(false);
        }
      });
    };
    loadDataAsync();
  }, []);

  const value: AuthContextValues = {
    user: userAuthState,
    isLoadingUser: isLoadingUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
