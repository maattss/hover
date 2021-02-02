import { Challenge_Type_Enum } from './types';

export type PendingChallenge = {
  id: number;
  challenge_type: Challenge_Type_Enum;
  end_date: Date;
  is_active: boolean;
  start_date: Date;
  opponents: Opponent[];
};

export type Opponent = {
  accepted: boolean;
  id: string;
  name: string;
  picture: string;
  bio: string;
};
