import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Spacing, Typography } from '../../theme';
import Button from '../../components/general/Button';
import { Asset } from 'expo-asset';
import useTracking from '../../hooks/useTracking';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const DisclaimerScreen: React.FC = () => {
  const askPermission = useTracking().askPermission;
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>Location disclaimer</Text>
      <Text style={styles.bodyText}>
        This app collects location data to enable background tracking. Note that your location is never sent anywhere
        nor shared without your concent.
      </Text>

      <Text style={styles.bodyText}>
        The main functionality of this application is to let users track their position when they are located in
        pre-defined geofences. An activity can be started, paused, and stopped at any time. We will not send your
        location data to our servers unless you actively decide to publish and share your activity. You may also, at any
        time during tracking, choose to discard the activity.
      </Text>
      <View style={styles.mapContainer}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          source={{ uri: Asset.fromModule(require('../../assets/images/disclaimer/map.png')).uri }}
          style={styles.image}
        />
      </View>
      <View style={[styles.button, { bottom: insets.bottom }]}>
        <Button onPress={() => askPermission()}>Grant location access</Button>
      </View>
    </SafeAreaView>
  );
};
export default DisclaimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.smaller,
  },
  titleText: {
    ...Typography.headerText,
    paddingTop: Spacing.base,
    width: '100%',
    textAlign: 'center',
  },
  bodyText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.smaller,
  },
  mapContainer: {
    marginTop: Spacing.base,
  },
  image: {
    aspectRatio: 1.5,
    width: '100%',
    borderRadius: Spacing.smaller,
  },
  button: {
    width: '100%',
    position: 'absolute',
    marginBottom: Spacing.smaller,
  },
});
