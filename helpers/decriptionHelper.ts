import { PendingChallenge } from '../types/challengeTypes';
import { Challenge_Type_Enum } from '../types/types';

export const generateDescription = (challenge: PendingChallenge) => {
  let description = '';
  switch (challenge.challenge_type) {
    case Challenge_Type_Enum.Score:
      description = scoreDescription(challenge);
  }
  return description;
};

const scoreDescription = (challenge: PendingChallenge) => {
  console.log(challenge.rules);
  const { score } = JSON.parse(challenge.rules);
  let description = '';
  description += challenge.opponents[0].name;
  description += ' challenge you to a Score challenge!';

  description += score ? ' Be the first person to reach ' + score + 'points.' : '';
  return description;
};
