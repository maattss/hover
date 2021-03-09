import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, Image, ActivityIndicator, Button } from 'react-native';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { SettingsProps } from './SettingsMenuScreen';
import { useUserQuery } from '../../../graphql/queries/User.generated';
import { useUpdateUserMutation } from '../../../graphql/mutations/UpdateUser.generated';
import useAuthentication from '../../../hooks/useAuthentication';
import CustomButton from '../../../components/general/Button';
import Loading from '../../../components/general/Loading';
import { randomPictureURI } from '../../auth/SignUpScreen';
import { Asset } from 'expo-asset';
import KeyboardAvoider from '../../../components/keyboard/KeyboardAvoider';

const EditProfileScreen: React.FC<SettingsProps> = ({ navigation }: SettingsProps) => {
  const id = useAuthentication().user?.uid;
  if (!id) {
    console.error('Error: UserId is', id);
    Alert.alert('Error: UserId is', id);
    return <></>;
  } else {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [loadingImage, setLoadingImage] = useState(true);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const defaultPicture = Asset.fromModule(require('../../../assets/images/user.png')).uri;
    const [picture, setPicture] = useState(defaultPicture);

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
        setPicture(data.user?.picture ? data.user?.picture : defaultPicture);
      }
      if (response) {
        setName(response.update_user?.name ? response.update_user?.name : '');
        setBio(response.update_user?.bio ? response.update_user?.bio : '');
        setPicture(response.update_user?.picture ? response.update_user?.picture : '');
      }
    }, [data, response]);

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

    if (fetchError || mutationError) {
      console.error(fetchError || mutationError);
      Alert.alert('Error', fetchError?.message || mutationError?.message);
    }
    if (fetchLoading || mutationLoading) return <Loading />;
    return (
      <KeyboardAvoider>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: picture }}
              style={styles.avatar}
              onLoadStart={() => setLoadingImage(true)}
              onLoadEnd={() => setLoadingImage(false)}
            />
            {loadingImage && <ActivityIndicator style={styles.avatarLoading} color={Colors.blue} />}
            <Button onPress={() => setPicture(randomPictureURI())} title="Regenerate picture" />
          </View>

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
            style={styles.formFieldMultiLine}
            multiline={true}
            numberOfLines={3}
          />
          <CustomButton onPress={onSubmit}>Save changes</CustomButton>
        </View>
      </KeyboardAvoider>
    );
  }
};
export default EditProfileScreen;

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
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  avatar: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    backgroundColor: Colors.gray900,
  },
  avatarLoading: {
    height: 100,
    width: 100,
    position: 'absolute',
    top: 0,
  },
});
