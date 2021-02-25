import { Notification_Type_Enum } from '../types/types';

export const getNotificationTitle = (type: Notification_Type_Enum) => {
  switch (type) {
    case Notification_Type_Enum.ChallengeClosed:
      return 'Oh no...';
    case Notification_Type_Enum.ChallengeExpired:
      return 'Oh no...';
    case Notification_Type_Enum.ChallengeFinished:
      return 'We have a winner ...';
    case Notification_Type_Enum.ChallengeInvite:
      return `You've been challenged!`;
    case Notification_Type_Enum.ChallengeWon:
      return 'Congratulation!';
    case Notification_Type_Enum.NewAchievement:
      return 'Congratulation!';
    case Notification_Type_Enum.ParticipantUpdate:
      return 'Someone responded to your challenge';
    default:
      return 'Notification!';
  }
};
