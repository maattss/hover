import { ChallengeRules } from '../types/challengeTypes';
import { Challenge_Type_Enum } from '../types/types';

export const convertToJsonRule = (rules: ChallengeRules): string => {
  const jsonRule = JSON.parse(JSON.stringify(rules));
  console.log('convertToJsonRule: ', jsonRule);
  return jsonRule;
};

export const getChallengeType = (rules: ChallengeRules) => {
  if (rules.score && !rules.category) return Challenge_Type_Enum.Score;
  else if (rules.score && rules.category) return Challenge_Type_Enum.ScoreCategory;
};
