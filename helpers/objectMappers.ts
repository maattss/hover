/* eslint-disable @typescript-eslint/no-var-requires */
import { LocationRegion } from 'expo-location';
import { GeofencesQuery } from '../graphql/queries/Geofences.generated';
import { LatLng } from 'react-native-maps';
import { estimatedRadius } from './geoFenceCalculations';
import { CircleGeoFence, GeoFence, GeoFenceCategory, GeoFenceVariant, PolygonGeoFence } from '../types/geoFenceTypes';
import { Item } from '../components/leaderboard/Leaderboard';
import { HighscoreQuery } from '../graphql/queries/Highscore.generated';
import { ProfileUserQuery } from '../graphql/queries/ProfileUser.generated';
import { UserProfile, Achievement as AchievementType, AchievementVariant } from '../types/profileTypes';
import { ActivityFeedData } from '../types/feedTypes';
import { Asset } from 'expo-asset';
import { Challenge_State_Enum, Challenge_Type_Enum, Geofences } from '../types/types';
import { OngoingChallenge, PendingChallenge } from '../types/challengeTypes';
import { GetChallengesQuery } from '../graphql/queries/GetChallenges.generated';
import { ChallengeFragmentFragment, ListUserFragmentFragment } from '../graphql/Fragments.generated';

// Default location NTNU Trondheim
export const defaultMapLocation: LatLng = {
  latitude: 63.419,
  longitude: 10.4025,
};

export const convertToRegion = (data: GeofencesQuery): LocationRegion[] => {
  const geoFences: LocationRegion[] = [];
  for (const obj of data.geofences) {
    if (obj.variant === 'CIRCLE') {
      geoFences.push({
        identifier: obj.id.toString(),
        latitude: obj.latitude,
        longitude: obj.longitude,
        radius: obj.radius,
        notifyOnEnter: true,
        notifyOnExit: true,
      });
    } else if (obj.variant === 'POLYGON') {
      const coordinates = obj.coordinates ? fromRawCoordinatesToLatLng(obj.coordinates) : [];
      geoFences.push({
        identifier: obj.id.toString(),
        latitude: obj.latitude,
        longitude: obj.longitude,
        radius: obj.radius ? obj.radius : estimatedRadius(coordinates),
        notifyOnEnter: true,
        notifyOnExit: true,
      });
    }
  }
  return geoFences;
};

export const convertToGeoFences = (data: GeofencesQuery) => {
  const geoFences: GeoFence[] = [];
  for (const obj of data.geofences) {
    if (obj && obj.variant === 'CIRCLE') {
      const geo = convertToGeoFence(obj);
      if (geo) geoFences.push(geo);
    } else if (obj.variant === 'POLYGON') {
      const geo = convertToGeoFence(obj);
      if (geo) geoFences.push(geo);
    }
  }
  return geoFences;
};
export const convertToGeoFence = (geofence: GeoFencesQuery) => {
  if (geofence.variant === 'CIRCLE') {
    return {
      id: geofence.id,
      name: geofence.name,
      description: geofence.description ? geofence.description : '',
      latitude: geofence.latitude,
      longitude: geofence.longitude,
      category: GeoFenceCategory[geofence.category as keyof typeof GeoFenceCategory],
      variant: GeoFenceVariant[geofence.variant as keyof typeof GeoFenceVariant],
      radius: geofence.radius,
    } as CircleGeoFence;
  } else if (geofence.variant === 'POLYGON') {
    const coordinates = geofence.coordinates ? fromRawCoordinatesToLatLng(geofence.coordinates) : [];
    return {
      id: geofence.id,
      name: geofence.name,
      description: geofence.description ? geofence.description : '',
      latitude: geofence.latitude,
      longitude: geofence.longitude,
      category: GeoFenceCategory[geofence.category as keyof typeof GeoFenceCategory],
      variant: GeoFenceVariant[geofence.variant as keyof typeof GeoFenceVariant],
      radius: geofence.radius,
      coordinates: coordinates,
    } as PolygonGeoFence;
  }
};

const fromRawCoordinatesToLatLng = (coordinatesRaw: string) => {
  // Translate from string coordinates in db to array of LatLng objects
  const coordinatesSplitted: string[] = coordinatesRaw.split(',');
  const coordinates: LatLng[] = [];
  for (let i = 0; i < coordinatesSplitted.length; i = i + 2) {
    coordinates.push({
      latitude: +coordinatesSplitted[i],
      longitude: +coordinatesSplitted[i + 1],
    });
  }
  return coordinates;
};

export const convertToHighscoreList = (data: HighscoreQuery) => {
  const highscores: Item[] = [];
  data.users.forEach((obj) =>
    highscores.push({
      id: obj.id,
      name: obj.name,
      score: obj.activities_aggregate.aggregate?.sum?.score,
      picture: obj.picture,
    } as Item),
  );
  return highscores;
};

export const defaultUserProfile: UserProfile = {
  id: '',
  name: '',
  bio: '',
  email: '',
  picture: Asset.fromModule(require('../assets/images/user.png')).uri, // Default picture
  totalScore: 0,
  educationScore: 0,
  cultureScore: 0,
  socialScore: 0,
  exerciseScore: 0,
  achievements: [],
  activities: [],
};

export const convertToUserProfile = (data: ProfileUserQuery | undefined) => {
  if (data && data.user) {
    const achievements: AchievementType[] = [];
    data.user.user_achievement.forEach((obj) => {
      achievements.push({
        description: obj.achievement.description ?? '',
        name: obj.achievement.name ?? '',
        level: obj.achievement.level ?? 3,
        createdAt: obj.achievement.created_at ?? '',
        type: AchievementVariant[obj.achievement.achievement_type as keyof typeof AchievementVariant],
        rule: obj.achievement.rule ?? {},
      });
    });
    const activitites: ActivityFeedData[] = [];
    data.user.activities.forEach((obj) => {
      activitites.push({
        userName: data.user ? data.user.name : defaultUserProfile.name,
        startedAt: obj.started_at,
        score: obj.score ?? 0,
        picture: data.user?.picture ? data.user.picture : defaultUserProfile.picture.toString(),
        geoFence: convertToGeoFence(obj.geofence),
        caption: obj.caption ?? '',
        duration: obj.duration,
      });
    });
    return {
      id: data.user.id ?? '',
      name: data.user.name ?? defaultUserProfile.name,
      bio: data.user.bio ?? defaultUserProfile.bio,
      email: data.user.email ?? defaultUserProfile.email,
      picture: data.user.picture ?? Asset.fromModule(require('../assets/images/user.png')).uri, // Default picture
      totalScore: data.user.totalScore ?? defaultUserProfile.totalScore,
      educationScore: data.user.education_score.aggregate?.sum?.score ?? defaultUserProfile.educationScore,
      cultureScore: data.user.culture_score.aggregate?.sum?.score ?? defaultUserProfile.cultureScore,
      socialScore: data.user.social_score.aggregate?.sum?.score ?? defaultUserProfile.socialScore,
      exerciseScore: data.user.exercise_score.aggregate?.sum?.score ?? defaultUserProfile.exerciseScore,
      achievements: achievements,
      activities: activitites,
    } as UserProfile;
  }
};

type UserChallenges = {
  pendingChallenges: PendingChallenge[];
  ongoingChallenges: OngoingChallenge[];
};
export const convertChallenge = (challengeData: GetChallengesQuery) => {
  const pendingChallenges: PendingChallenge[] = [];
  const ongoingChallenges: OngoingChallenge[] = [];

  if (challengeData && challengeData.user) {
    const user = challengeData.user;
    if (challengeData.user?.pending_challenges) {
      challengeData.user.pending_challenges.forEach((obj) =>
        pendingChallenges.push(convertToChallenge(obj.challenge, user) as PendingChallenge),
      );
    }
    if (challengeData.user?.ongoing_challenges) {
      challengeData.user.ongoing_challenges.forEach((obj) =>
        ongoingChallenges.push(convertToChallenge(obj.challenge, user) as OngoingChallenge),
      );
    }
  }
  return { pendingChallenges, ongoingChallenges } as UserChallenges;
};

export const convertToChallenge = (
  challenge: ChallengeFragmentFragment,
  user: ListUserFragmentFragment,
): OngoingChallenge | PendingChallenge => {
  {
    const opponents = challenge.opponents;
    return {
      user: user,
      created_by: challenge.created_by_user,
      id: challenge.id,
      challenge_type: challenge.challenge_type as Challenge_Type_Enum,
      created_at: challenge.created_at,
      end_date: challenge.end_date,
      state: challenge.state as Challenge_State_Enum,
      start_date: challenge.start_date,
      opponents: opponents,
      rules: challenge.rules ?? {},
    };
  }
};

type GeoFencesQuery = {
  readonly __typename: 'geofences';
} & Pick<
  Geofences,
  'id' | 'name' | 'description' | 'category' | 'variant' | 'latitude' | 'longitude' | 'radius' | 'coordinates'
>;
