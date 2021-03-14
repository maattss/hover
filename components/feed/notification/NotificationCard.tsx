import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../../theme';
import { NotificationFragmentFragment } from '../../../graphql/Fragments.generated';
import { getNotificationColor, getNotificationIcon, getNotificationTitle } from '../../../helpers/notificationHelpers';
import { timeStampToPresentable } from '../../../helpers/dateTimeHelpers';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../../../types/navigationTypes';
import { useNavigation } from '@react-navigation/native';
import { Notification_Type_Enum } from '../../../types/types';
import { Asset } from 'expo-asset';

type BottomNavigationProp = BottomTabNavigationProp<RootTabParamList>;

interface NotificationCardProps {
  notification: NotificationFragmentFragment;
}
const NotificationCard: React.FC<NotificationCardProps> = (props: NotificationCardProps) => {
  const bgColor = props.notification.seen ? Colors.almostBlack : Colors.gray900;
  const bottomNavigation = useNavigation<BottomNavigationProp>();

  const getNotificationGoToAction = () => {
    switch (props.notification.type) {
      case Notification_Type_Enum.ChallengeClosed:
        bottomNavigation.navigate('Challenge');
        break;
      case Notification_Type_Enum.ChallengeFinished:
        bottomNavigation.navigate('Feed');
        break;
      case Notification_Type_Enum.ChallengeInvite:
        bottomNavigation.navigate('Challenge');
        break;
      case Notification_Type_Enum.ChallengeWon:
        bottomNavigation.navigate('Feed');
        break;
      case Notification_Type_Enum.NewAchievement:
        bottomNavigation.navigate('Profile');
        break;
      case Notification_Type_Enum.ParticipantUpdate:
        bottomNavigation.navigate('Challenge');
        break;
      case Notification_Type_Enum.NewReaction:
        bottomNavigation.navigate('Profile');
        break;
      default:
        break;
    }
  };
  return (
    <TouchableOpacity onPress={() => getNotificationGoToAction()}>
      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <View style={styles.main}>
          <Image
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            source={{ uri: Asset.fromModule(getNotificationIcon(props.notification.type)).uri }}
            style={styles.notificationIcon}
          />
          <View style={styles.body}>
            <Text style={styles.title}>{getNotificationTitle(props.notification.type)}</Text>
            <Text style={{ ...Typography.bodyText }}>{props.notification.text}</Text>
          </View>
          <View style={styles.goTo}>
            <FAIcon name={'chevron-right'} style={{ ...Typography.largeBodyText }} />
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>{timeStampToPresentable(props.notification.created_at)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.smaller,
    marginVertical: Spacing.smallest,
    marginHorizontal: Spacing.smaller,
    borderRadius: Spacing.smaller,
  },
  title: {
    ...Typography.headerText,
    fontSize: 20,
  },
  main: {
    ...Typography.bodyText,
    marginVertical: Spacing.smallest,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    marginRight: Spacing.smallest,
  },
  body: {
    width: '80%',
    paddingRight: Spacing.small,
  },
  goTo: {
    width: '5%',
    paddingVertical: Spacing.small,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
});
