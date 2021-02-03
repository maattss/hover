import { FontAwesome5 } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
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
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        await Asset.loadAsync(require('../assets/images/user.png'));
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
