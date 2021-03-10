import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import CustomButton from '../../../components/general/Button';
import KeyboardAvoider from '../../../components/keyboard/KeyboardAvoider';

const FeedbackScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const [subject, setSubject] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const onSubmit = () => {
    console.log('Send Feedback');
    //open mail
    navigation.goBack();
  };
  return (
    <KeyboardAvoider>
      <View style={styles.container}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          placeholder={'Subject'}
          placeholderTextColor={Colors.gray600}
          value={subject}
          onChangeText={(val) => setSubject(val)}
          style={styles.formField}
        />
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
