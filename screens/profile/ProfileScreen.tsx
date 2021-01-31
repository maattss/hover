import { QueryResult } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import useAuthentication from '../../hooks/useAuthentication';
import { Colors, Spacing, Typography } from '../../theme';
import { UserProfile } from '../../types/profileTypes';

const ProfileScreen: React.FC = () => {
  const id = useAuthentication().user?.uid;
  const [user, setUser] = useState<UserProfile>();

  if (id) {
    const { loading: loading, error: error, data: data } = useProfileUserQuery({
      variables: {
        id: id,
      },
    });
    useEffect(() => {
      if (data) {
        if (data.user) {
          console.log(data.user);
        }
      }
    }, [data]);

    if (error) {
      console.error(error);
      Alert.alert('Error', error?.message);
    }
    if (loading)
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={Colors.blue} />
        </View>
      );

    return (
      <View style={styles.container}>
        <Text style={styles.name}>Name</Text>
        <Text style={styles.bio}>Bio</Text>
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
  name: {
    ...Typography.headerText,
    marginTop: Spacing.base,
  },
  bio: {
    ...Typography.largeBodyText,
    fontStyle: 'italic',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '20%',
  },
});

export default ProfileScreen;
