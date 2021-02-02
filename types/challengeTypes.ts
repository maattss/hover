import { Challenge_Type_Enum } from './types';

export type PendingChallenge = {
  id: number;
  challenge_type: Challenge_Type_Enum;
  created_at: string;
  rules?: string;
  end_date: Date;
  is_active: boolean;
  start_date: Date;
  opponents: Opponent[];
};

export type Opponent = {
  accepted: boolean;
} & ChallengeUser;

export type ChallengeUser = {
  id: string;
  name: string;
  picture: string;
};

export type OngoingChallenge = {
  user: ChallengeUser;
  id: number;
  challenge_type: Challenge_Type_Enum;
  rules?: string;
  end_date: Date;
  is_active: boolean;
  start_date: Date;
  created_at: string;
  opponents: Opponent[];
};
