/* eslint-disable @typescript-eslint/no-var-requires */
import { Asset } from 'expo-asset';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useProfileUserQuery } from '../../graphql/queries/ProfileUser.generated';
import { convertToProfileUser } from '../../helpers/objectMappers';
import useAuthentication from '../../hooks/useAuthentication';
import { Colors, Spacing, Typography } from '../../theme';
import { UserProfile, Achievement } from '../../types/profileTypes';

const ProfileScreen: React.FC = () => {
  const id = useAuthentication().user?.uid;
  const [user, setUser] = useState<UserProfile>({
    name: '',
    bio: '',
    email: '',
    picture: Asset.fromModule(require('../../assets/images/user.png')).uri, // Default picture
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
          const achievements: Achievement[] = [];
          data.user.user_achievement.forEach((obj) => {
            achievements.push({
              description: obj.achievement.description ?? '',
              name: obj.achievement.name ?? '',
              level: obj.achievement.level ?? 3,
              createdAt: obj.achievement.created_at ?? '',
              achievementType: obj.achievement.achievement_type ?? '',
            });
          });
          setUser({
            name: data.user.name ?? user.name,
            bio: data.user.bio ?? user.bio,
            email: data.user.email ?? user.email,
            picture: data.user.picture ?? user.picture,
            totalScore: data.user.totalScore ?? user.totalScore,
            achievements: achievements,
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
    const renderAchievements = () => {
      return user.achievements.map((achievement, index) => {
        return (
          <View key={index} style={styles.achievement}>
            <Text style={{ ...Typography.largeBodyText }}>{achievement.name}</Text>
          </View>
        );
      });
    };
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
          <Text style={styles.score}>Score</Text>
          <Text style={styles.score}>{user.totalScore}</Text>
        </View>
        <Text style={styles.score}>Achievements</Text>
        <ScrollView style={styles.achievementsContainer} horizontal={true}>
          {renderAchievements()}
        </ScrollView>
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
    backgroundColor: Colors.white, // Default color
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
  achievementsContainer: {
    height: 100,
  },
  achievement: {
    height: 100,
    width: 100,
    padding: Spacing.smallest,
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.extraLarge,
    marginRight: Spacing.small,
  },
});

export default ProfileScreen;
