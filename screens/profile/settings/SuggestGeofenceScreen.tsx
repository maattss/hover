import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Linking } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import CustomButton, { CategoryButton } from '../../../components/general/Button';
import KeyboardAvoider from '../../../components/keyboard/KeyboardAvoider';
import { GeoFenceCategory } from '../../../types/geoFenceTypes';
import * as MailComposer from 'expo-mail-composer';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const SuggestGeofenceScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const subject = 'Location suggestion';

  const onSubmit = async () => {
    const available = await MailComposer.isAvailableAsync();
    if (!available) {
      const body = `New location suggestion\nCategory: ${category}\nLocation: ${location}`;
      Linking.openURL(`mailto:contact.hoverapp@gmail.com?subject=${subject}&body=${body}`);
      return;
    }

    const bodyHTML = `<p><b>New location suggestion</b></p><p>Category: <i>${category}</i></br>Location: <i>${location}</i></p>`;
    try {
      const value = await MailComposer.composeAsync({
        recipients: ['contact.hoverapp@gmail.com'],
        subject: subject,
        body: bodyHTML,
        isHtml: true,
      });
      if (value.status !== 'sent') throw Error();
      Alert.alert('New location submitted!');
      navigation.goBack();
    } catch (reason) {
      Alert.alert('Something went wrong', reason);
    }
  };
  const renderCategories = () =>
    Object.keys(GeoFenceCategory).map((cat, index) => {
      const categoryEnum: GeoFenceCategory = GeoFenceCategory[cat as keyof typeof GeoFenceCategory];
      return (
        <CategoryButton
          key={index}
          category={categoryEnum}
          isSelected={category == categoryEnum}
          onPress={() => {
            setCategory(categoryEnum);
          }}
        />
      );
    });

  return (
    <KeyboardAvoider>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconRound}>
            <FAIcon name={'map-marked-alt'} style={styles.icon} />
          </View>
        </View>
        <Text style={styles.label}>Category</Text>
        <View style={styles.categoryButtonsContainer}>{renderCategories()}</View>
        <Text style={styles.label}>Location</Text>
        <TextInput
          placeholder={'Which location would you like us to add?'}
          placeholderTextColor={Colors.gray600}
          value={location}
          onChangeText={(val) => setLocation(val)}
          style={styles.formFieldMultiLine}
          multiline={true}
          numberOfLines={5}
        />
        <CustomButton onPress={async () => await onSubmit()}>
          Send Suggestion {'  '}
          <FAIcon name={'external-link-alt'} style={{ ...Typography.icon, fontSize: 20 }} />
        </CustomButton>
      </View>
    </KeyboardAvoider>
  );
};
export default SuggestGeofenceScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.base,
    padding: Spacing.smaller,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: Spacing.base,
  },
  iconRound: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    width: 120,
    height: 120,
    backgroundColor: Colors.gray900,
  },
  icon: {
    ...Typography.icon,
    marginBottom: Spacing.smallest,
    fontSize: 60,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray900,
  },
  formFieldMultiLine: {
    ...Buttons.button,
    ...Typography.bodyText,
    backgroundColor: Colors.gray900,
    paddingTop: Spacing.base,
    paddingLeft: Spacing.base,
    marginBottom: Spacing.base,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
});
