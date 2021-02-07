import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import { useUserQuery } from '../../../graphql/queries/User.generated';
import { useUpdateUserMutation } from '../../../graphql/mutations/UpdateUser.generated';
import useAuthentication from '../../../hooks/useAuthentication';
import Button from '../../../components/Button';
import Loading from '../../../components/Loading';
import { randomPictureURI } from '../../auth/SignUpScreen';

const UserSettingsScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const id = useAuthentication().user?.uid;
  if (!id) {
    console.error('Error: UserId is', id);
    Alert.alert('Error: UserId is', id);
    return <></>;
  } else {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [loadingImage, setLoadingImage] = useState(true);
    const [picture, setPicture] = useState('');
    const { loading: fetchLoading, error: fetchError, data: data } = useUserQuery({
      variables: {
        id: id,
      },
    });
    const [
      updateUserSettings,
      { loading: mutationLoading, error: mutationError, data: response },
    ] = useUpdateUserMutation();

    useEffect(() => {
      if (data) {
        setName(data.user?.name ? data.user?.name : '');
        setBio(data.user?.bio ? data.user?.bio : '');
        setPicture(data.user?.picture ? data.user?.picture : '');
      }
      if (response) {
        setName(response.update_user?.name ? response.update_user?.name : '');
        setBio(response.update_user?.bio ? response.update_user?.bio : '');
        setPicture(response.update_user?.picture ? response.update_user?.picture : '');
      }
    }, [data, response]);

    if (fetchError || mutationError) {
      console.error(fetchError || mutationError);
      Alert.alert('Error', fetchError?.message || mutationError?.message);
    }
    if (fetchLoading || mutationLoading) return <Loading />;

    const onSubmit = () => {
      updateUserSettings({
        variables: {
          id,
          name,
          picture,
          bio,
        },
      })
        .finally(() => navigation.goBack())
        .catch((error) => {
          console.error(error.message);
        });
    };

    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: picture }}
                style={styles.avatar}
                onLoadStart={() => setLoadingImage(true)}
                onLoadEnd={() => setLoadingImage(false)}
              />
              {loadingImage && <ActivityIndicator style={styles.avatarLoading} color={Colors.blue} />}
            </View>
            {!loadingImage && <Button onPress={() => setPicture(randomPictureURI())}>Regen picture</Button>}
            <Text style={styles.label}>Name</Text>
            <TextInput
              placeholder={'Enter your name'}
              placeholderTextColor={Colors.gray600}
              value={name}
              onChangeText={(val) => setName(val)}
              style={styles.formField}
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
              placeholder={'Enter something funny about yourself!'}
              placeholderTextColor={Colors.gray600}
              value={bio}
              onChangeText={(val) => setBio(val)}
              style={styles.formField}
              multiline={true}
              numberOfLines={3}
              onSubmitEditing={onSubmit}
            />
            <Button onPress={onSubmit}>Save changes</Button>
          </View>
        </View>
      </ScrollView>
    );
  }
};
export default UserSettingsScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
  },
  formContainer: {
    width: '90%',
    marginTop: '5%',
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
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    margin: Spacing.small,
    backgroundColor: Colors.gray900,
  },
  avatarLoading: {
    position: 'absolute',
    top: 45,
  },
});
