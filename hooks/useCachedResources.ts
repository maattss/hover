import { FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as React from 'react';

const useCachedResources = () => {
  const [isLoadingAssets, setLoadingAssets] = React.useState(true);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    const loadResourcesAsync = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome5.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingAssets(false);
      }
    };
    loadResourcesAsync();
  }, []);

  return isLoadingAssets;
};

export default useCachedResources;
