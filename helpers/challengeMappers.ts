import { ChallengeRules } from '../types/challengeTypes';
import { Challenge_Type_Enum } from '../types/types';

export const convertToJsonRule = (rules: ChallengeRules): string => {
  const jsonRule = JSON.parse(JSON.stringify(rules));
  return jsonRule;
};

export const getChallengeTypeEnum = (challengeType: string): Challenge_Type_Enum => {
  return Object.values(Challenge_Type_Enum).find((key) => key == challengeType) ?? Challenge_Type_Enum.Score;
};

export const getChallengeTypeFields = (challengeType: Challenge_Type_Enum): string[] => {
  switch (challengeType) {
    case Challenge_Type_Enum.Score:
      return ['SCORE'];
    case Challenge_Type_Enum.ScoreCategory:
      return ['SCORE', 'CATEGORY'];
    case Challenge_Type_Enum.Time:
      return ['TIME'];
    case Challenge_Type_Enum.TimeCategory:
      return ['TIME', 'CATEGORY'];
  }
};
