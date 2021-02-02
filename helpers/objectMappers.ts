import { LocationRegion } from 'expo-location';
import { GeofencesQuery } from '../graphql/queries/Geofences.generated';
import { LatLng } from 'react-native-maps';
import { estimatedRadius } from './geoFenceCalculations';
import { CircleGeoFence, GeoFence, GeoFenceCategory, GeoFenceVariant, PolygonGeoFence } from '../types/geoFenceTypes';
import { Item } from '../components/Leaderboard';
import { HighscoreQuery } from '../graphql/queries/Highscore.generated';
import { ProfileUserQuery } from '../graphql/queries/ProfileUser.generated';
import { UserProfile } from '../types/profileTypes';
import { Geofences } from '../types/types';

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
