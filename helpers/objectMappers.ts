import { LocationRegion } from 'expo-location';
import { GeofencesQuery } from '../graphql/queries/Geofences.generated';
import { LatLng } from 'react-native-maps';
import { estimatedRadius } from './geoFenceCalculations';
import { CircleGeoFence, GeoFence, GeoFenceCategory, GeoFenceVariant, PolygonGeoFence } from '../types/geoFenceTypes';
import { Item } from '../components/Leaderboard';
import { HighscoreQuery } from '../graphql/queries/Highscore.generated';
import { Opponent, PendingChallenge } from '../types/challengeTypes';
import { GetChallengesQuery } from '../graphql/queries/GetChallenges.generated';
import { Challenge_Participant, Challenge_Type_Enum } from '../types/types';
import { BasicUserFragmentFragment } from '../graphql/Fragments.generated';

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

export const convertToGeoFence = (data: GeofencesQuery) => {
  const geoFences: GeoFence[] = [];
  for (const obj of data.geofences) {
    if (obj.variant === 'CIRCLE') {
      geoFences.push({
        id: obj.id,
        name: obj.name,
        description: obj.description ? obj.description : '',
        latitude: obj.latitude,
        longitude: obj.longitude,
        category: GeoFenceCategory[obj.category as keyof typeof GeoFenceCategory],
        variant: GeoFenceVariant[obj.variant as keyof typeof GeoFenceVariant],
        radius: obj.radius,
      } as CircleGeoFence);
    } else if (obj.variant === 'POLYGON') {
      const coordinates = obj.coordinates ? fromRawCoordinatesToLatLng(obj.coordinates) : [];
      geoFences.push({
        id: obj.id,
        name: obj.name,
        description: obj.description ? obj.description : '',
        latitude: obj.latitude,
        longitude: obj.longitude,
        category: GeoFenceCategory[obj.category as keyof typeof GeoFenceCategory],
        variant: GeoFenceVariant[obj.variant as keyof typeof GeoFenceVariant],
        radius: obj.radius,
        coordinates: coordinates,
      } as PolygonGeoFence);
    }
  }
  return geoFences;
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
type UserChallenges = {
  pendingChallenges: PendingChallenge[];
};
export const convertChallenge = (challengeData: GetChallengesQuery) => {
  const pendingChallenges: PendingChallenge[] = [];
  if (challengeData && challengeData.user && challengeData.user?.pending_challenges) {
    challengeData.user.pending_challenges.forEach((obj) =>
      pendingChallenges.push({
        id: obj.challenge.id,
        challenge_type: obj.challenge.challenge_type as Challenge_Type_Enum,
        end_date: new Date(obj.challenge.end_date),
        is_active: obj.challenge.is_active,
        start_date: new Date(obj.challenge.start_date),
        opponents: convertOpponent(obj.challenge.opponents),
      } as PendingChallenge),
    );
  }
  return { pendingChallenges } as UserChallenges;
};

export const convertOpponent = (opponentData: OpponentQueryData) => {
  const opponents: Opponent[] = [];
  if (opponentData) {
    opponentData.forEach((obj) =>
      opponents.push({
        id: obj.user.id,
        name: obj.user.name,
        accepted: obj.accepted,
        picture: obj.user.picture,
        bio: obj.user.bio,
      } as Opponent),
    );
  }
  return opponents;
};

type OpponentQueryData = ReadonlyArray<
  { readonly __typename: 'challenge_participant' } & Pick<Challenge_Participant, 'accepted'> & {
      readonly user: { readonly __typename: 'users' } & BasicUserFragmentFragment;
    }
>;
