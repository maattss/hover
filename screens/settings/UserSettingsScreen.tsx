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
  ScrollView,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import Firebase from '../../lib/firebase';
import { GET_USER, UPDATE_USER_NAME } from '../../lib/queries/settingsQueries';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { SettingsProps } from './SettingsMenuScreen';

const UserSettingsScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const id = Firebase.auth().currentUser?.uid;
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const { loading: fetchLoading, error: fetchError, data } = useQuery(GET_USER, {
    variables: { id },
  });
  const [updateUser, { loading: mutationLoading, error: mutationError, data: response }] = useMutation(
    UPDATE_USER_NAME,
  );
  useEffect(() => {
    let newName = null;
    let newBio = null;

    if (data) {
      const { users_by_pk: user } = data;
      const { name, bio } = user;
      newName = name;
      newBio = bio;
    }

    if (response) {
      const { update_users_by_pk } = response;
      const { name, bio } = update_users_by_pk;
      newName = name;
      newBio = bio;
    }

    setName(newName);
    setBio(newBio);
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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colors.blue} />
      </View>
    );
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <View style={styles.formRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Name</Text>
            </View>
            <TextInput
              placeholder={'What is your name?'}
              value={name}
              onChangeText={(val) => setName(val)}
              style={styles.formField}
            />
          </View>
          <View style={styles.formRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.labelText}>Bio</Text>
            </View>
            <TextInput
              placeholder={'Tell me something about yourself!'}
              value={bio}
              onChangeText={(val) => setBio(val)}
              style={styles.formFieldMultiLine}
              multiline={true}
              numberOfLines={3}
            />
          </View>
          <TouchableOpacity
            style={[styles.editButton]}
            onPress={() => {
              updateUser({
                variables: {
                  id,
                  name,
                  bio,
                },
              })
                .finally(() => navigation.goBack())
                .catch((error) => {
                  console.error(error.message);
                });
            }}>
            <Text style={{ ...Buttons.buttonText }}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
export default UserSettingsScreen;

interface Style {
  container: ViewStyle;
  loadingContainer: ViewStyle;
  formContainer: ViewStyle;
  formRow: ViewStyle;
  formField: ViewStyle;
  formFieldMultiLine: ViewStyle;
  labelText: TextStyle;
  labelContainer: ViewStyle;
  editButton: ViewStyle;
}

const styles = StyleSheet.create<Style>({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '20%',
  },
  formContainer: {
    width: '90%',
    marginTop: '5%',
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    backgroundColor: Colors.gray300,
    width: '80%',
  },
  formFieldMultiLine: {
    ...Buttons.button,
    ...Typography.bodyText,
    backgroundColor: Colors.gray300,
    width: '80%',
    paddingTop: Spacing.base,
    paddingLeft: Spacing.base,
  },
  labelText: {
    ...Typography.largeBodyText,
    fontWeight: 'bold',
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: Spacing.smallest,
    width: '20%',
  },
  editButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
    marginTop: Spacing.base,
  },
});
