import { Colors } from '../theme';
import { Notification_Type_Enum } from '../types/types';

export const getNotificationTitle = (type: Notification_Type_Enum) => {
  switch (type) {
    case Notification_Type_Enum.ChallengeClosed:
      return 'Oh no...';
    case Notification_Type_Enum.ChallengeExpired:
      return 'Oh no...';
    case Notification_Type_Enum.ChallengeFinished:
      return 'We have a winner!';
    case Notification_Type_Enum.ChallengeInvite:
      return `You've been challenged!`;
    case Notification_Type_Enum.ChallengeWon:
      return 'Congratulations, you won!';
    case Notification_Type_Enum.NewAchievement:
      return 'Congratulations!';
    case Notification_Type_Enum.ParticipantUpdate:
      return 'Someone responded to your challenge';
    case Notification_Type_Enum.NewReaction:
      return 'New reaction';
    case Notification_Type_Enum.Message:
      return 'New message';
    default:
      return 'Notification!';
  }
};
export const getNotificationIcon = (type: Notification_Type_Enum) => {
  switch (type) {
    case Notification_Type_Enum.ChallengeClosed:
      return 'user-slash';
    case Notification_Type_Enum.ChallengeExpired:
      return 'exclamation-circle'; //OK
    case Notification_Type_Enum.ChallengeFinished:
      return 'flag';
    case Notification_Type_Enum.ChallengeInvite:
      return 'user-clock';
    case Notification_Type_Enum.ChallengeWon:
      return 'star';
    case Notification_Type_Enum.NewAchievement:
      return 'trophy';
    case Notification_Type_Enum.ParticipantUpdate:
      return 'user-check';
    case Notification_Type_Enum.NewReaction:
      return 'thumbs-up';
    case Notification_Type_Enum.Message:
      return 'comment';
    default:
      return 'comment';
  }
};

export const getNotificationColor = (type: Notification_Type_Enum): string => {
  switch (type) {
    case Notification_Type_Enum.ChallengeClosed:
      return Colors.red;
    case Notification_Type_Enum.ChallengeExpired:
      return Colors.red;
    case Notification_Type_Enum.ChallengeFinished:
      return Colors.green;
    case Notification_Type_Enum.ChallengeInvite:
      return Colors.blue;
    case Notification_Type_Enum.ChallengeWon:
      return Colors.gold;
    case Notification_Type_Enum.NewAchievement:
      return Colors.gold;
    case Notification_Type_Enum.ParticipantUpdate:
      return Colors.blue;
    case Notification_Type_Enum.NewReaction:
      return Colors.blue;
    case Notification_Type_Enum.Message:
      return Colors.blue;
    default:
      return Colors.white;
  }
};
