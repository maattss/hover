/* eslint-disable @typescript-eslint/no-var-requires */
import { LocationRegion } from 'expo-location';
import { GeofencesQuery } from '../graphql/queries/Geofences.generated';
import { LatLng } from 'react-native-maps';
import { estimatedRadius } from './geoFenceCalculations';
import { CircleGeoFence, GeoFence, GeoFenceCategory, GeoFenceVariant, PolygonGeoFence } from '../types/geoFenceTypes';
import { Item } from '../components/Leaderboard';
import { HighscoreQuery } from '../graphql/queries/Highscore.generated';
import { ProfileUserQuery } from '../graphql/queries/ProfileUser.generated';
import { UserProfile, Achievement as AchievementType, AchievementVariant } from '../types/profileTypes';
import { ActivityFeedData } from '../types/feedTypes';
import { Asset } from 'expo-asset';

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
export const convertToGeoFence = (geofence: any) => {
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

export const convertToProfileUser = (data: ProfileUserQuery | undefined) => {
  if (data && data.user) {
    const achievements: AchievementType[] = [];
    data.user.user_achievement.forEach((obj: any) => {
      achievements.push({
        description: obj.achievement.description ?? '',
        name: obj.achievement.name ?? '',
        level: obj.achievement.level ?? 3,
        createdAt: obj.achievement.created_at ?? '',
        type: AchievementVariant[obj.achievement.achievement_type as keyof typeof AchievementVariant],
        rule: obj.achievement.rule ?? '{}',
      });
    });
    const activitites: ActivityFeedData[] = [];
    data.user.activities.forEach((obj: any) => {
      activitites.push({
        userName: data.user ? data.user.name : '',
        startedAt: obj.started_at,
        score: obj.score ?? 0,
        picture: data.user ? data.user.picture : Asset.fromModule(require('../assets/images/user.png')).uri, // Default picture
        geoFence: convertToGeoFence(obj.geofence),
        caption: obj.caption ?? '',
        duration: obj.duration,
      });
    });
    return {
      name: data.user.name ?? '',
      bio: data.user.bio ?? '',
      email: data.user.email ?? '',
      picture: data.user.picture ?? Asset.fromModule(require('../assets/images/user.png')).uri, // Default picture
      totalScore: data.user.totalScore ?? '0',
      educationScore: data.user.education_score.aggregate?.sum?.score ?? '0',
      cultureScore: data.user.culture_score.aggregate?.sum?.score ?? '0',
      socialScore: data.user.social_score.aggregate?.sum?.score ?? '0',
      exerciseScore: data.user.exercise_score.aggregate?.sum?.score ?? '0',
      achievements: achievements,
      activities: activitites,
    } as UserProfile;
  }
};
