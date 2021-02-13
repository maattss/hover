import { ListUserFragmentFragment } from '../graphql/Fragments.generated';
import { ChallengeRules, OngoingChallenge, PendingChallenge } from '../types/challengeTypes';
import { Challenge_Type_Enum } from '../types/types';
import { toPrettyDate } from './dateTimeHelpers';

/**
 * PENDING CHALLENGES DESCRIPTION HELPERS.
 */
export const generateDescription = (challenge: PendingChallenge) => {
  let description;
  switch (challenge.challenge_type) {
    case Challenge_Type_Enum.Score:
      description = scoreDescription(challenge);
      break;
    case Challenge_Type_Enum.ScoreCategory:
      description = scoreCategoryDescription(challenge);
      break;
    case Challenge_Type_Enum.Time:
      description = timeDescription(challenge);
    case Challenge_Type_Enum.TimeCategory:
      description = timeCategoryDescription(challenge);
      break;
    default: {
      description = defaultDescription(challenge);
      break;
    }
  }

  return description;
};

const scoreDescription = (challenge: PendingChallenge) => {
  let description = challenge.created_by.name;
  description += ' challenge you to a Score challenge!';
  description += challenge.rules ? ' Be the first person to reach ' + challenge.rules.score + ' points' : '';
  description += challenge.end_date ? ' by ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};

const scoreCategoryDescription = (challenge: PendingChallenge) => {
  let description = challenge.created_by.name;
  description += ' challenge you to a Category challenge!';
  description += challenge.rules.score ? ' Be the first person to reach ' + challenge.rules.score + ' points' : '';
  description += challenge.rules.category
    ? ' in the ' + challenge.rules.category.toString().toLowerCase() + ' category'
    : ' at any valid Hover location';
  description += challenge.end_date ? ' by ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};
const timeDescription = (challenge: PendingChallenge) => {
  let description = challenge.created_by.name;
  description += ' challenge you to a Time challenge!';
  description += challenge.rules.time ? ' Be the first person to reach ' + challenge.rules.time + ' hours' : '';
  description += challenge.end_date ? ' by ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};
const timeCategoryDescription = (challenge: PendingChallenge) => {
  let description = challenge.created_by.name;
  description += ' challenge you to a Time in Category challenge!';
  description += challenge.rules.time ? ' Be the first person to reach ' + challenge.rules.time + ' hours' : '';
  description += challenge.rules.category
    ? ' in the ' + challenge.rules.category.toString().toLowerCase() + ' category'
    : ' at any valid Hover location';
  description += challenge.end_date ? ' by ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};

const defaultDescription = (challenge: PendingChallenge) => {
  let description = challenge.created_by.name + ' challenge you to a ';
  description += challenge.challenge_type + ' challenge!';
  description += challenge.end_date ? ' by ' + toPrettyDate(challenge.end_date) + '.' : '';
  return description;
};
/**
 * ONGOING CHALLENGES DESCRIPTION HELPERS.
 */

export const generateOngoingChallengeDescription = (challenge: OngoingChallenge) => {
  let description = 'First person to';
  description += challenge.rules.score ? ' get ' + challenge.rules.score + ' points' : '';
  description += challenge.rules.time ? ' spend ' + challenge.rules.time + ' hours' : '';
  description += challenge.rules.category
    ? ' at a location within the ' + challenge.rules.category.toLowerCase() + ' category'
    : ' at any valid Hover location';
  description += challenge.end_date ? ' by ' + toPrettyDate(new Date(challenge.end_date)) + '.' : '';
  return description;
};

/**
 * NEW CHALLENGE DESCRIPTION HELPERS.
 */

export const generateNewChallengeDescription = (
  challenge_type: Challenge_Type_Enum,
  rules: ChallengeRules,
  end_date: string,
  participants: ListUserFragmentFragment[],
) => {
  let description;
  description = 'You are challenging ' + participantsToString(participants);
  description += ' to a ' + challenge_type.toLowerCase().toString().replace('_', ' in ') + ' challenge. ';
  description += 'The challenge is simple; first person to';
  description += rules.score ? ' get ' + rules.score + ' points' : '';
  description += rules.time ? ' spend ' + rules.time + ' hours' : '';
  description += rules.category
    ? ' at a location within the ' + rules.category.toLowerCase() + ' category'
    : ' at any valid Hover location';
  description += end_date ? ' by ' + toPrettyDate(new Date(end_date)) + '.' : '';
  return description;
};

const participantsToString = (participants: ListUserFragmentFragment[]) => {
  return participants
    .map((participant) => participant.name.split(' ')[0])
    .join(', ')
    .replace(/,(?=[^,]*$)/, ' and');
};
