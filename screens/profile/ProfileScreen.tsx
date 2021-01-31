import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { UserQuery, useUserQuery } from '../../graphql/queries/User.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { Spacing, Typography } from '../../theme';
import { Users } from '../../types/types';

const ProfileScreen: React.FC = () => {
  const id = useAuthentication().user?.uid;
  const [name, setName] = useState('');
  const [bi, setBio] = useState('');
  const [user, setUser] = useState<UserQuery>();

  if (id) {
    const { loading: fetchLoading, error: fetchError, data: data } = useUserQuery({
      variables: {
        id: id,
      },
    });
    useEffect(() => {
      if (data) {
        if (data.user !== null) {
          setUser(data.user);
        }
      }
    }, [data]);

    return (
      <View style={styles.container}>
        <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>{user.name}</Text>
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ProfileScreen;
