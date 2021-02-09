import { ChallengeRules } from '../types/challengeTypes';
import { Challenge_Type_Enum } from '../types/types';

export const convertToJsonRule = (rules: ChallengeRules): string => {
  const jsonRule = JSON.parse(JSON.stringify(rules));
  console.log('convertToJsonRule: ', jsonRule);
  return jsonRule;
};

export const getChallengeTypeEnum = (challengeType: string): Challenge_Type_Enum => {
  return Object.values(Challenge_Type_Enum).find((key) => key == challengeType) ?? Challenge_Type_Enum.Score;
};
