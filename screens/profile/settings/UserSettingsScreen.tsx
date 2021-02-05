import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  TextStyle,
  ViewStyle,
  Alert,
  ScrollView,
} from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import { useUserQuery } from '../../../graphql/queries/User.generated';
import { useUpdateUserMutation } from '../../../graphql/mutations/UpdateUser.generated';
import useAuthentication from '../../../hooks/useAuthentication';
import Loading from '../../../components/Loading';

const UserSettingsScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const id = useAuthentication().user?.uid;
  if (!id) {
    console.error('Error: UserId is', id);
    Alert.alert('Error: UserId is', id);
    return <></>;
  } else {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const { loading: fetchLoading, error: fetchError, data: data } = useUserQuery({
      variables: {
        id: id,
      },
    });
    const [updateUser, { loading: mutationLoading, error: mutationError, data: response }] = useUpdateUserMutation();

    useEffect(() => {
      if (data) {
        setName(data.user?.name ? data.user?.name : '');
        setBio(data.user?.bio ? data.user?.bio : '');
      }
      if (response) {
        setName(response.update_user?.name ? response.update_user?.name : '');
        setBio(response.update_user?.bio ? response.update_user?.bio : '');
      }
    }, [data, response]);

    if (fetchError || mutationError) {
      console.error(fetchError || mutationError);
      Alert.alert('Error', fetchError?.message || mutationError?.message);
    }
    if (fetchLoading || mutationLoading) return <Loading />;
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
                placeholderTextColor={Colors.gray600}
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
                placeholderTextColor={Colors.gray600}
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
  }
};
export default UserSettingsScreen;

interface Style {
  container: ViewStyle;
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
    backgroundColor: Colors.gray900,
    width: '80%',
  },
  formFieldMultiLine: {
    ...Buttons.button,
    ...Typography.bodyText,
    backgroundColor: Colors.gray900,
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
