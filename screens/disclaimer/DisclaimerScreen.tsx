import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Spacing, Typography } from '../../theme';
import Button from '../../components/general/Button';
import { Asset } from 'expo-asset';
import useTracking from '../../hooks/useTracking';

const DisclaimerScreen: React.FC = () => {
  const askPermission = useTracking().askPermission;
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Location disclaimer</Text>
      <Text style={styles.bodyText}>
        This app collects location data to enable background tracking. Note that your location is never sent anywhere
        nor shared without your concent.
      </Text>

      <Text style={styles.bodyText}>
        The main functionality of the app is to let users to record a track when they are located within a particular
        geofence. Your activity can be started, paused, stopped at any time. Aditionally we will not send your
        activity(including your geofence location) before you choose to publish the tracked activity. You can at any
        time discard the activity.
      </Text>
      <View style={styles.mapContainer}>
        <Image
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          source={{ uri: Asset.fromModule(require('../../assets/images/map-disclosure.png')).uri }}
          style={styles.image}
        />
      </View>
      <View style={styles.button}>
        <Button onPress={() => askPermission()}>Grant location access</Button>
      </View>
    </View>
  );
};
export default DisclaimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.largest,
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
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
    aspectRatio: 1,
  },
  button: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingVertical: Spacing.large,
  },
});
