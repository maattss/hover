/* eslint-disable @typescript-eslint/ban-types */
import { ListUserFragmentFragment, OpponentFragmentFragment } from '../graphql/Fragments.generated';
import { GeoFenceCategory } from './geoFenceTypes';
import { Challenge_Participant_State_Enum, Challenge_State_Enum, Challenge_Type_Enum } from './types';

export type PendingChallenge = {
  user_id: string;
  created_by: ListUserFragmentFragment;
  id: number;
  challenge_type: Challenge_Type_Enum;
  created_at: string;
  rules: ChallengeRules;
  end_date: Date;
  state: Challenge_State_Enum;
  start_date: Date;
  opponents: readonly OpponentFragmentFragment[];
};

export type Opponent = {
  state: Challenge_Participant_State_Enum;
} & ChallengeUser;

export type ChallengeUser = {
  id: string;
  name: string;
  picture: string;
};

export type OngoingChallenge = {
  user: ListUserFragmentFragment;
  created_by: ListUserFragmentFragment;
  id: number;
  challenge_type: Challenge_Type_Enum;
  rules: ChallengeRules;
  end_date: Date;
  state: Challenge_State_Enum;
  start_date: Date;
  created_at: string;
  opponents: readonly OpponentFragmentFragment[];
};

export type ChallengeRules = {
  category?: GeoFenceCategory;
  score?: number;
  time?: number;
};
