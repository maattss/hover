/* eslint-disable @typescript-eslint/ban-types */
import { Challenge_Participant_State_Enum, Challenge_State_Enum, Challenge_Type_Enum } from './types';

export type PendingChallenge = {
  user_id: string;
  created_by: ChallengeUser;
  id: number;
  challenge_type: Challenge_Type_Enum;
  created_at: string;
  rules: ChallengeRules;
  end_date: Date;
  state: Challenge_State_Enum;
  start_date: Date;
  opponents: Opponent[];
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
  user: ChallengeUser;
  created_by: ChallengeUser;
  id: number;
  challenge_type: Challenge_Type_Enum;
  rules: ChallengeRules;
  end_date: Date;
  state: Challenge_State_Enum;
  start_date: Date;
  created_at: string;
  opponents: Opponent[];
};

export type ChallengeRules = {
  category?: string;
  score?: number;
};
