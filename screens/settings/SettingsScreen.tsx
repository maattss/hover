import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, ActivityIndicator, View, TextInput, StyleSheet } from 'react-native';
import tailwind from 'tailwind-rn';
import { useQuery, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';

import Firebase from '../../lib/firebase';
import { GET_USER, UPDATE_USER_NAME } from '../../lib/queries/settingsQueries';
import { color } from 'react-native-reanimated';

const SettingsScreen = () => {
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
      <SafeAreaView style={[styles.flex, styles.center]}>
        <ActivityIndicator color={'rgba(59, 130, 246, 1)'} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <View style={tailwind('mt-10')}>
          {(!name || editing) && (
            <View>
              <Text style={styles.textXl}>What is your name?</Text>
              <View style={styles.row}>
                <TextInput
                  placeholder={!name ? 'Name ...' : name}
                  onChangeText={(val) => setName(val)}
                  onFocus={() => setEditing(true)}
                  style={tailwind('text-2xl flex-grow')}
                />
                <TouchableOpacity
                  style={[styles.roundBtn, styles.editBtn]}
                  onPress={() => {
                    updateUser({
                      variables: {
                        id,
                        name,
                      },
                    });
                    setEditing(false);
                  }}>
                  <Feather name="check" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {name && !editing && (
            <View>
              <Text style={styles.textXl}>Did I get your name right?</Text>
              <View style={styles.row}>
                <Text style={tailwind('text-2xl text-blue-500')}>{name}</Text>
                <TouchableOpacity style={[styles.roundBtn, styles.editBtn]} onPress={() => setEditing(true)}>
                  <Feather name="edit" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={[styles.row]}>
          <TouchableOpacity style={[styles.longBtn, styles.signoutBtn]} onPress={() => Firebase.auth().signOut()}>
            <Text style={styles.textXl}>
              Sign out
              <Feather name="log-out" color="#fff" size={20} />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  container: {
    paddingBottom: 50,
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20,
  },
  row: {
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 2,
  },
  roundBtn: {
    height: 40,
    width: 40,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: 'rgba(59, 130, 246, 1)',
  },
  longBtn: {
    height: 50,
    width: 300,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signoutBtn: {
    backgroundColor: 'rgba(239, 68, 68, 1)',
  },
  textXl: {
    fontSize: 15,
    lineHeight: 15,
  },
  label: {
    fontSize: 17,
    flex: 1,
    paddingRight: 80,
  },
});
