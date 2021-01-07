import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  TextInput,
  TextStyle,
  ViewStyle,
  Alert,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';

import Firebase from '../../../lib/firebase';
import { GET_USER, UPDATE_USER_NAME } from '../../../lib/queries/settingsQueries';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from '../SettingsScreen';

const UserSettingsScreen = ({ navigation }: SettingsProps) => {
  const id = Firebase.auth().currentUser?.uid;
  const [name, setName] = useState('');
  const { loading: fetchLoading, error: fetchError, data } = useQuery(GET_USER, { variables: { id } });
  const [updateUser, { loading: mutationLoading, error: mutationError, data: response }] = useMutation(
    UPDATE_USER_NAME,
  );
  useEffect(() => {
    let newName = null;

    if (data) {
      const { users_by_pk: user } = data;
      const { name } = user;
      newName = name;
    }

    if (response) {
      const { update_users_by_pk } = response;
      const { name } = update_users_by_pk;
      newName = name;
    }

    setName(newName);
  }, [data, response]);

  if (fetchError) {
    console.error(fetchError);
    Alert.alert('Error', fetchError.message);
  }
  if (mutationError) {
    console.error(mutationError);
    Alert.alert('Error', mutationError.message);
  }
  if (fetchLoading || mutationLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.blue} />
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.textInputRow}>
        <Text style={styles.textStyle}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={'What is your name?'}
            value={name}
            onChangeText={(val) => setName(val)}
            style={styles.textInput}
          />
        </View>
      </View>
      <TouchableOpacity
        style={[styles.editButton]}
        onPress={() => {
          updateUser({
            variables: {
              id,
              name,
            },
          })
            .then(({ data }) => {
              setName(data);
              console.log(name);
            })
            .finally(() => navigation.goBack())
            .catch((error) => {
              console.error(error.message);
            });
        }}>
        <Text style={{ ...Buttons.buttonText }}>
          Save <Entypo name="edit" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default UserSettingsScreen;

interface Style {
  container: ViewStyle;
  textStyle: TextStyle;
  textInputRow: ViewStyle;
  textInput: ViewStyle;
  inputContainer: ViewStyle;
  editButton: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
  },
  textStyle: {
    backgroundColor: 'transparent',
    ...Typography.largeBodyText,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
  },
  textInputRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: Spacing.large,
    marginRight: Spacing.large,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
  textInput: {
    ...Typography.largeBodyText,
  },
  inputContainer: {
    borderColor: Colors.blue,
    borderBottomWidth: 2,
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
  },
  editButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});
