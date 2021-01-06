import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, TextInput } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';

import Firebase from '../../../lib/firebase';
import { GET_USER, UPDATE_USER_NAME } from '../../../lib/queries/settingsQueries';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';

const UserSettingsScreen: React.FC = () => {
  const id = Firebase.auth().currentUser?.uid;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const { loading: fetchLoading, data } = useQuery(GET_USER, { variables: { id } });
  const [updateUser, { loading: mutationLoading, data: response }] = useMutation(UPDATE_USER_NAME);
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

  if (fetchLoading || mutationLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={Colors.blue} />
      </View>
    );
  return (
    <View style={styles.container}>
      {(!name || editing) && (
        <View>
          <View style={styles.textInputRow}>
            <Text style={styles.textStyle}>Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={!name ? 'What is your name?' : name}
                onChangeText={(val) => setName(val)}
                onFocus={() => setEditing(true)}
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
              });
              setEditing(false);
            }}>
            <Text>Save</Text>
            <Entypo name="edit" />
          </TouchableOpacity>
        </View>
      )}
      {name && !editing && (
        <View>
          <Text style={styles.textStyle}>Did I get your name right?</Text>
          <View>
            <Text style={styles.textStyle}>{name}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => setEditing(true)}>
              <Entypo name="edit" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
export default UserSettingsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: Spacing.large,
    paddingRight: Spacing.large,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small,
  },
  textStyle: {
    backgroundColor: 'transparent',
    ...Typography.largeBodyText,
    paddingLeft: Spacing.large,
    paddingRight: Spacing.large,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small,
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
    paddingLeft: Spacing.large,
    paddingRight: Spacing.large,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small,
  },
  editButton: {
    ...Buttons.button,
    backgroundColor: Colors.blue,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});
