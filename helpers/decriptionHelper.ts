import { PendingChallenge } from '../types/challengeTypes';
import { Challenge_Type_Enum } from '../types/types';
import { toPrettyDate } from './dateTimeHelpers';

export const generateDescription = (challenge: PendingChallenge) => {
  let description;
  switch (challenge.challenge_type) {
    case Challenge_Type_Enum.Score:
      description = scoreDescription(challenge);
      break;
    case Challenge_Type_Enum.ScoreCategory:
      description = scoreCategoryDescription(challenge);
      break;
    default: {
      description = defaultDescription(challenge);
      break;
    }
  }

  return description;
};

const scoreDescription = (challenge: PendingChallenge) => {
  let description = challenge.opponents[0].name;
  description += ' challenge you to a Score challenge!';
  description += challenge.rules ? ' Be the first person to reach ' + challenge.rules.score + ' points' : '';
  description += challenge.end_date ? ' by the ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};

const scoreCategoryDescription = (challenge: PendingChallenge) => {
  let description = challenge.opponents[0].name;
  description += ' challenge you to a Category challenge!';
  description += challenge.rules.score ? ' Be the first person to reach ' + challenge.rules.score + ' points' : '';
  description += challenge.rules.category ? ' in the ' + challenge.rules.category.toLowerCase() + ' category' : '';
  description += challenge.end_date ? ' by the ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};

const defaultDescription = (challenge: PendingChallenge) => {
  let description = challenge.opponents[0].name + ' challenge you to a ';
  description += challenge.challenge_type + ' challenge!';
  description += challenge.end_date ? ' by the ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};
