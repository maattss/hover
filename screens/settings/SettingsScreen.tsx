import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity, ActivityIndicator, View, TextInput } from 'react-native';
import tailwind from 'tailwind-rn';
import { useQuery, useMutation } from '@apollo/client';
import { Feather } from '@expo/vector-icons';

import Firebase from '../../lib/firebase';
import { GET_USER, UPDATE_USER_NAME } from '../../lib/queries';

export function SettingsScreen() {
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
      {
        /* if a name already exists, set it as the name */
      }
      newName = name;
    }

    if (response) {
      const { update_users_by_pk } = response;
      const { name } = update_users_by_pk;
      {
        /* when a user updates their name, set that as the name */
      }
      newName = name;
    }

    setName(newName);
    {
      /* call this effect whenever data or response changes */
    }
  }, [data, response]);

  {
    /* Show a spinner if we are fetching/updating the data */
  }
  if (fetchLoading || mutationLoading)
    return (
      <SafeAreaView style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color={'#0000FF'} />
      </SafeAreaView>
    );
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <View style={tailwind('py-10 px-5')}>
        <View style={tailwind('flex-row justify-between items-center')}>
          <Text style={tailwind('text-4xl font-bold')}>Home</Text>
          <TouchableOpacity
            style={tailwind('rounded-full bg-red-500 h-10 w-10 items-center justify-center')}
            onPress={() => Firebase.auth().signOut()}>
            <Feather name="log-out" color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <View style={tailwind('mt-10')}>
          {/* If we don't have a name or
          the user wants to edit their name
          show the edit form */}
          {(!name || editing) && (
            <View>
              <Text style={tailwind('text-xl')}>What is your name?</Text>
              <View style={tailwind('border-b border-blue-500 mt-2 flex-row justify-between items-center pb-2')}>
                <TextInput
                  placeholder="Not Faraz"
                  onChangeText={(val) => setName(val)}
                  onFocus={() => setEditing(true)}
                  style={tailwind('text-2xl flex-grow')}
                />
                <TouchableOpacity
                  style={tailwind('bg-blue-500 h-8 w-8 rounded-full items-center justify-center')}
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
          {/* If we have a name, display it
          with an option to edit */}
          {name && !editing && (
            <View>
              <Text style={tailwind('text-xl')}>Did I get your name right?</Text>
              <View style={tailwind('mt-2 flex-row justify-between items-center pb-2')}>
                <Text style={tailwind('text-2xl text-blue-500')}>{name}</Text>
                <TouchableOpacity
                  style={tailwind('bg-blue-500 h-8 w-8 rounded-full items-center justify-center')}
                  onPress={() => setEditing(true)}>
                  <Feather name="edit" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SettingsScreen;
