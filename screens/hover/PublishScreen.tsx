import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  ViewStyle,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { FontAwesome as FAIcon } from '@expo/vector-icons';
import { durationToTimestamp, timeStampToHours } from '../../helpers/dateTimeHelpers';
import Button from '../../components/general/Button';
import { getGeoFenceImage } from '../../helpers/geoFenceCalculations';
import MapView, { LatLng, Marker, Region } from 'react-native-maps';
import GeoFences from '../../components/map/GeoFences';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PublishScreen: React.FC = () => {
  const tracking = useTracking();
  const insets = useSafeAreaInsets();
  const [caption, setCaption] = useState('');

  const publishActivity = () => tracking.stopTracking(caption);
  const resumeTracking = () => tracking.resumeTracking();
  const discardActivity = () => {
    Alert.alert('Discard activity', 'Are you sure you want to discard this activity? It will be lost forever.', [
      { text: 'No', style: 'cancel' },
      {
        text: 'Yes',
        onPress: () => tracking.discardActivity(),
        style: 'destructive',
      },
    ]);
  };
  const safeTop = () => {
    return {
      marginTop: insets.top,
    } as ViewStyle;
  };

  const renderMap = () => {
    if (tracking.insideGeoFence) {
      const mapRegion: Region = {
        latitude: tracking.insideGeoFence?.latitude,
        longitude: tracking.insideGeoFence?.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      const markerCoordinate: LatLng = {
        latitude: tracking.insideGeoFence?.latitude,
        longitude: tracking.insideGeoFence?.longitude,
      };
      return (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          zoomEnabled={false}>
          <Marker
            coordinate={markerCoordinate}
            title={tracking.insideGeoFence?.name ?? 'No name'}
            description={tracking.insideGeoFence?.description ?? 'No description'}
          />
          <GeoFences geofences={[tracking.insideGeoFence]} />
        </MapView>
      );
    }
    return <></>;
  };

  return (
    <View style={safeTop()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.scroll}>
          <View style={styles.topBar}>
            <View style={styles.topBarIcon}>
              <FAIcon name={'question-circle'} style={styles.questionIcon} />
            </View>

            <View style={styles.resumeDiscardContainer}>
              <Text style={styles.infoTextSmall}>Not ready to publish{'\n'}this activity yet?</Text>
              <View style={styles.resumeDiscardButtons}>
                <TouchableOpacity
                  style={[styles.resumeButton, { backgroundColor: Colors.green }]}
                  onPress={resumeTracking}>
                  <Text style={{ ...Buttons.buttonText }}>Resume</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.discardButton} onPress={discardActivity}>
                  <Text style={{ ...Buttons.buttonText }}>Discard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.summaryContainer}>
            <Text style={styles.infoScore}>{Math.floor(tracking.score)} points</Text>

            <Text style={styles.label}>Summary</Text>
            <View style={styles.infoContainer}>
              <View style={{ width: '59%' }}>
                <View style={[styles.infoCard, { alignItems: 'flex-start' }]}>
                  <View style={styles.mbSmall}>
                    <Text style={styles.infoText}>Duration</Text>
                    <Text style={styles.infoTextSmall}>{durationToTimestamp(tracking.duration)}</Text>
                  </View>
                  <View style={styles.mbSmall}>
                    <Text style={styles.infoText}>Started at</Text>
                    <Text style={styles.infoTextSmall}>{timeStampToHours(tracking.trackingStart)}</Text>
                  </View>
                  {tracking.insideGeoFence && (
                    <View style={styles.mbSmall}>
                      <Text style={styles.infoText}>Location</Text>
                      <Text style={styles.infoTextSmall}>{tracking.insideGeoFence?.name}</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={{ width: '39%' }}>
                <View style={[styles.infoCard, { alignItems: 'center' }]}>
                  <Image
                    source={{ uri: getGeoFenceImage(tracking.insideGeoFence?.category) }}
                    style={styles.categoryIcon}
                  />
                  <Text style={{ ...Typography.largeBodyText }}>{tracking.insideGeoFence?.category}</Text>
                </View>
              </View>
            </View>

            <View style={{ marginBottom: Spacing.base }}>
              <Text style={styles.label}>Caption</Text>
              <TextInput
                placeholder="Insert a funny text that describes the activity!"
                placeholderTextColor={Colors.gray600}
                onChangeText={(val) => setCaption(val)}
                style={styles.formField}
                multiline>
                {caption}
              </TextInput>
            </View>

            {tracking.insideGeoFence && (
              <View style={{ marginBottom: 150 }}>
                <Text style={styles.label}>Map</Text>
                {renderMap()}
              </View>
            )}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <View style={styles.publishContainer}>
        <Button onPress={publishActivity}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    padding: Spacing.smaller,
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
  },
  topBarIcon: {
    justifyContent: 'center',
    marginLeft: Spacing.base,
  },
  resumeDiscardContainer: {
    alignItems: 'flex-start',
  },
  resumeDiscardButtons: {
    marginTop: Spacing.smaller,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  resumeButton: {
    ...Buttons.button,
    padding: Spacing.small,
    marginRight: Spacing.smaller,
  },
  discardButton: {
    ...Buttons.button,
    padding: Spacing.small,
    backgroundColor: Colors.red,
  },
  questionIcon: {
    fontSize: 60,
    color: Colors.almostWhite,
  },
  summaryContainer: {
    marginTop: Spacing.base,
  },
  infoScore: {
    ...Typography.headerText,
    marginBottom: Spacing.base,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    alignItems: 'center',
    height: 150,
  },
  infoCard: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.smaller,
    height: '100%',
    justifyContent: 'center',
  },
  infoText: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
  },
  infoTextSmall: {
    ...Typography.largeBodyText,
    fontSize: 16,
  },
  categoryIcon: {
    height: 80,
    width: 80,
    marginBottom: Spacing.small,
  },
  label: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    marginLeft: Spacing.smallest,
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    paddingTop: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  publishContainer: {
    position: 'absolute',
    bottom: Spacing.smaller,
    left: Spacing.smaller,
    right: Spacing.smaller,
  },
  publishButton: {
    ...Buttons.button,
    paddingHorizontal: Spacing.extraLarge,
  },
  publishButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
  map: {
    height: 150,
    borderRadius: Spacing.smaller,
  },
  mbSmall: {
    marginBottom: Spacing.smaller,
  },
});

export default PublishScreen;
