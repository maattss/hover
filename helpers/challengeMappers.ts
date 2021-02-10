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
  let fields: string[] = [];
  switch (challengeType) {
    case Challenge_Type_Enum.Score:
      fields = ['score'];
      break;
    case Challenge_Type_Enum.ScoreCategory:
      fields = ['score', 'category'];
      break;
    case Challenge_Type_Enum.Time:
      fields = ['time'];
      break;
    case Challenge_Type_Enum.TimeCategory:
      fields = ['time', 'category'];
      break;
  }
  return fields;
};
