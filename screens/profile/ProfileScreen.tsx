import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import { convertToProfileUser } from '../../helpers/objectMappers';
import useAuthentication from '../../hooks/useAuthentication';
import { Colors, Spacing, Typography } from '../../theme';
import { UserProfile } from '../../types/profileTypes';
import { Achievement } from '../../types/profileTypes';

const ProfileScreen: React.FC = () => {
  const id = useAuthentication().user?.uid;
  const [user, setUser] = useState<UserProfile>({
    name: '',
    bio: '',
    email: '',
    picture: '',
    totalScore: 0,
    achievements: [],
  });

  if (id) {
    const { loading: loading, error: error, data: data } = useProfileUserQuery({
      variables: {
        id: id,
      },
    });
    useEffect(() => {
      if (data) {
        if (data.user) {
          setUser({
            name: data.user.name ?? user.name,
            bio: data.user.bio ?? user.bio,
            email: data.user.email ?? user.email,
            picture: data.user.picture ?? user.picture,
            totalScore: data.user.totalScore ?? user.totalScore,
            achievements: [],
          });
          const achievements: Achievement[] = [];
          data.user.user_achievement.forEach((obj) => {
            achievements.push({
              description: obj.achievement.description ?? '',
              name: obj.achievement.name ?? '',
            });
          });
        }
        // achivementType: obj.achievement.achievement_type,
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
        <Text style={styles.name}>Name {user.name}</Text>
        <Text style={styles.bio}>Bio {user.bio}</Text>
      </View>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
    backgroundColor: 'green',
  },
  name: {
    ...Typography.headerText,
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
