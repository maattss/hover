import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import Firebase from '../lib/firebase';

const useCachedResources = () => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        Firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            setUserAuthState(user);
          } else {
            setUserAuthState(null);
          }
        });
        if (!Firebase.auth().currentUser && !userAuthState) {
          setLoading(true);
        } else {
          setLoading(false);
        }

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome5.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
