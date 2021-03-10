import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import CustomButton from '../../../components/general/Button';
import KeyboardAvoider from '../../../components/keyboard/KeyboardAvoider';
import * as MailComposer from 'expo-mail-composer';
import useAuthentication from '../../../hooks/useAuthentication';

const FeedbackScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const [feedback, setFeedback] = useState<string>('');

  const id = useAuthentication().user?.uid;
  const onSubmit = () => {
    MailComposer.composeAsync({
      recipients: ['contact.hoverapp@gmail.com'], // array of email addresses
      subject: 'Feedback',
      body: `Feedback from user ${id}: \n ${feedback}.`,
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
