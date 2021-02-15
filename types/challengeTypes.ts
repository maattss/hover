/* eslint-disable @typescript-eslint/ban-types */
import { ListUserFragmentFragment, OpponentFragmentFragment } from '../graphql/Fragments.generated';
import { GeoFenceCategory } from './geoFenceTypes';
import { Challenge_State_Enum, Challenge_Type_Enum } from './types';

export type PendingChallenge = {
  user: ListUserFragmentFragment;
  created_by: ListUserFragmentFragment;
  id: number;
  challenge_type: Challenge_Type_Enum;
  created_at: string;
  rules: ChallengeRules;
  end_date: string;
  state: Challenge_State_Enum;
  start_date: string;
  opponents: readonly OpponentFragmentFragment[];
};

export type OngoingChallenge = {
  user: ListUserFragmentFragment;
  created_by: ListUserFragmentFragment;
  id: number;
  challenge_type: Challenge_Type_Enum;
  rules: ChallengeRules;
  end_date: Date;
  state: Challenge_State_Enum;
  start_date: string;
  created_at: string;
  opponents: readonly OpponentFragmentFragment[];
};

export type ChallengeRules = {
  category?: GeoFenceCategory;
  score?: number;
  time?: number;
};
