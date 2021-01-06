import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, View, TextInput } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';

import Firebase from '../../../lib/firebase';
import { GET_USER, UPDATE_USER_NAME } from '../../../lib/queries/settingsQueries';
import { useTheme } from '../../../theme/ThemeProvider';
import { Colors } from '../../../theme';

const SettingsScreen: React.FC = () => {
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
  const { colors } = useTheme();
  if (fetchLoading || mutationLoading)
    return (
      <View style={styles.container}>
        <ActivityIndicator color={colors.text} />
      </View>
    );
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Setting</Text>
        <TouchableOpacity onPress={() => Firebase.auth().signOut()}>
          <Feather name="log-out" color={colors.primary} size={20} />
        </TouchableOpacity>
      </View>
      <View style={styles.insideContainer}>
        {(!name || editing) && (
          <View>
            <Text style={styles.textStyle}>What is your name?</Text>
            <View style={styles.container}>
              <TextInput
                placeholder="Not Faraz"
                onChangeText={(val) => setName(val)}
                onFocus={() => setEditing(true)}
              />
              <TouchableOpacity
                onPress={() => {
                  updateUser({
                    variables: {
                      id,
                      name,
                    },
                  });
                  setEditing(false);
                }}>
                <Feather name="check" size={16} color={Colors.blue} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {name && !editing && (
          <View>
            <Text style={styles.textStyle}>Did I get your name right?</Text>
            <View style={styles.container}>
              <Text style={styles.textStyle}>{name}</Text>
              <TouchableOpacity onPress={() => setEditing(true)}>
                <Feather name="edit" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  insideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    backgroundColor: 'transparent',
  },
});
