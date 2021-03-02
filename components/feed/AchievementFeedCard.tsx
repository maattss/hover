import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { AchievementFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Achievement from '../profile/Achievement';
import { defaultUserProfile } from '../../helpers/objectMappers';
import TouchableProfile from '../general/TouchableProfile';

interface AchievementFeedCardProps {
  data: AchievementFeedData;
}

const AchievementFeedCard: React.FC<AchievementFeedCardProps> = ({ data }: AchievementFeedCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <View style={styles.infoContainer}>
          <TouchableProfile user_id={data.user.id} name={data.user.name}>
            <View style={styles.topBar}>
              <Image
                source={{ uri: data.user.picture ? data.user.picture : defaultUserProfile.picture }}
                style={styles.avatar}
              />
              <Text style={styles.nameText} numberOfLines={1}>
                {data.user.name}
              </Text>
            </View>
          </TouchableProfile>
          <View style={styles.description}>
            <Text style={styles.descriptionText}>{data.achievement.description}</Text>
          </View>
        </View>

        <View style={styles.achievement}>
          <Achievement achievement={data.achievement} />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(data.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray900,
    borderRadius: Spacing.smaller,
    padding: Spacing.small,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoContainer: {
    width: '68%',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 30,
    flexWrap: 'wrap',
    marginTop: Spacing.smaller,
    width: '80%',
  },
  description: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Spacing.smaller,
  },
  descriptionText: {
    ...Typography.headerText,
    fontSize: 20,
    flexWrap: 'wrap',
    flexDirection: 'column',
    paddingLeft: Spacing.smaller,
    width: '100%',
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.smaller,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerText: {
    color: Colors.almostWhite,
    fontStyle: 'italic',
    fontSize: 14,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2,
    marginRight: Spacing.small,
  },
  achievement: {
    width: '35%',
    marginTop: Spacing.smallest,
  },
});

export default AchievementFeedCard;
