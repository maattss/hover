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
      return 'New response to your challenge';
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
      return require('../assets/images/notificationIcons/challenge-closed.png');
    case Notification_Type_Enum.ChallengeExpired:
      return require('../assets/images/notificationIcons/challenge-expired.png');
    case Notification_Type_Enum.ChallengeFinished:
      return require('../assets/images/notificationIcons/challenge-finished.png');
    case Notification_Type_Enum.ChallengeInvite:
      return require('../assets/images/notificationIcons/challenge-invite.png');
    case Notification_Type_Enum.ChallengeWon:
      return require('../assets/images/notificationIcons/challenge-won.png');
    case Notification_Type_Enum.NewAchievement:
      return require('../assets/images/notificationIcons/trophy.png');
    case Notification_Type_Enum.ParticipantUpdate:
      return require('../assets/images/notificationIcons/participant-update.png');
    case Notification_Type_Enum.NewReaction:
      return require('../assets/images/reactionIcons/clap.png');
    case Notification_Type_Enum.Message:
      return require('../assets/images/notificationIcons/message.png');
    default:
      return require('../assets/images/notificationIcons/default.png');
  }
};
