import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import useTracking from '../../hooks/useTracking';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { HoverStackParamList } from '../../types/navigationTypes';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { getCategoryColor, getCategoryIconName } from '../../components/feed/ActivityFeedCard';
import { GeoFenceCategory } from '../../types/geoFenceTypes';

type NavigationProp = StackNavigationProp<HoverStackParamList>;

type ExploreProps = {
  navigation: NavigationProp;
};

const PublishScreen: React.FC<ExploreProps> = ({ navigation }: ExploreProps) => {
  const tracking = useTracking();
  const [caption, setCaption] = useState('');

  const resumeTracking = () => {
    tracking.startTracking();
    navigation.goBack();
  };

  const discardActivity = () => {
    Alert.alert('Discard activity', 'Are you sure you want to discard this activity? It will be lost forever.', [
      { text: 'No' },
      {
        text: "Yes, I don{'}t care",
        onPress: () => {
          tracking.discardActivity();
          navigation.navigate('Explore');
        },
      },
    ]);
  };
  const publishActivity = () => {
    tracking.stopTracking('Test caption');
    navigation.navigate('Explore');
  };
  const categoryColor = {
    color: getCategoryColor(GeoFenceCategory.EDUCATION),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resumeButtonContainer}>
        <TouchableOpacity style={[styles.trackingButton, { backgroundColor: Colors.green }]} onPress={resumeTracking}>
          <Text style={styles.trackingButtonText}>Resume</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.discardButton} onPress={discardActivity}>
          <FAIcon name={'trash'} color={Colors.almostWhite} style={{ fontSize: 25 }} />
        </TouchableOpacity>
      </View>
      <View style={styles.trackingInfoContainer}>
        <View style={styles.infoContainer}>
          <Text style={{ ...Typography.headerText }}>Started</Text>
          <Text style={{ ...Typography.headerText }}>{tracking.trackingStart}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ ...Typography.headerText }}>Duration</Text>
          <Text style={styles.infoNumber}>{tracking.duration}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ ...Typography.headerText }}>Score</Text>
          <Text style={styles.infoNumber}>{Math.floor(tracking.score)}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={{ ...Typography.headerText }}>Category</Text>
          <FAIcon style={[styles.categoryIcon, categoryColor]} name={getCategoryIconName(GeoFenceCategory.EDUCATION)} />
        </View>
        <View>
          <Text style={{ ...Typography.headerText }}>Caption</Text>
          <TextInput
            placeholder="Insert a funny text that describes the activity!"
            placeholderTextColor={Colors.gray600}
            onChangeText={(val) => setCaption(val)}
            style={styles.formField}
            numberOfLines={3}>
            {caption}
          </TextInput>
        </View>
      </View>

      <View style={styles.publishButtonContainer}>
        <TouchableOpacity style={styles.publishButton} onPress={publishActivity}>
          <Text style={styles.publishButtonText}>Publish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: Spacing.smaller,
    justifyContent: 'space-between',
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 40,
    textAlign: 'center',
    width: '100%',
    marginVertical: Spacing.smallest,
  },
  trackingInfoContainer: {
    padding: Spacing.base,
    marginBottom: Spacing.smallest,
    // backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.small,
  },
  infoNumber: {
    ...Typography.headerText,
    marginRight: Spacing.base,
  },
  resumeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: Spacing.base,
  },
  trackingButton: {
    padding: Spacing.smallest,
    borderRadius: 110 / 2,
    width: 110,
    height: 110,
    justifyContent: 'center',
  },
  trackingButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
  publishButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: Spacing.base,
  },
  publishButton: {
    ...Buttons.button,
    paddingHorizontal: Spacing.extraLarge,
  },
  discardButton: {
    padding: Spacing.smallest,
    borderRadius: 50 / 2,
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
  },
  publishButtonText: {
    ...Buttons.buttonText,
    fontSize: 24,
    textAlign: 'center',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.small,
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray900,
  },
});

export default PublishScreen;
