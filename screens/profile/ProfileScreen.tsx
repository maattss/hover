import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
      <ScrollView style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={{ uri: user.picture }} style={styles.avatar} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.bio}>{user.bio}</Text>
          </View>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.score}>Score: {user.totalScore}</Text>
        </View>
        <View style={styles.achievementsContainer}>
          <Text style={styles.score}>Achievements</Text>
        </View>
      </ScrollView>
    );
  }
  return <></>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
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
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 80 / 2,
    margin: Spacing.small,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
  },
  infoContainer: {
    padding: Spacing.base,
    justifyContent: 'center',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Spacing.small,
  },
  score: {
    ...Typography.headerText,
  },
  achievementsContainer: {},
});

export default ProfileScreen;
