import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import CustomButton from '../../../components/general/Button';
import KeyboardAvoider from '../../../components/keyboard/KeyboardAvoider';
import * as MailComposer from 'expo-mail-composer';
import useAuthentication from '../../../hooks/useAuthentication';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

const FeedbackScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const [feedback, setFeedback] = useState<string>('');

  const id = useAuthentication().user?.uid;
  const onSubmit = () => {
    MailComposer.composeAsync({
      recipients: ['contact.hoverapp@gmail.com'], // array of email addresses
      subject: 'Feedback',
      body: `<p><b>Feedback from user ${id}:</b></p><p><i>${feedback}</i></p>`,
      isHtml: true,
    })
      .then((value) => {
        if (value.status !== 'sent') {
          Alert.alert('Something went wrong', 'Feedback not submitted');
        } else {
          Alert.alert('Feedback submitted!');
          navigation.goBack();
        }
        return;
      })
      .catch((reason) => Alert.alert('Something went wrong', reason));
  };
  return (
    <KeyboardAvoider>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <View style={styles.iconRound}>
            <FAIcon name={'clipboard-list'} style={styles.icon} />
          </View>
        </View>
        <Text style={styles.label}>Feedback</Text>
        <TextInput
          placeholder={'Give us your honest feedback!'}
          placeholderTextColor={Colors.gray600}
          value={feedback}
          onChangeText={(val) => setFeedback(val)}
          style={styles.formFieldMultiLine}
          multiline={true}
          numberOfLines={5}
        />
        <CustomButton onPress={onSubmit}>Send Feedback</CustomButton>
      </View>
    </KeyboardAvoider>
  );
};
export default FeedbackScreen;

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
    margin: Spacing.large,
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
});
