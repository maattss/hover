import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { AchievementFeedData } from '../../types/feedTypes';
import Achievement from '../general/Achievement';
import { defaultUserProfile } from '../../helpers/objectMappers';
import TouchableProfile from '../general/TouchableProfile';
import Reaction from './Reaction';
import { Avatar } from 'react-native-elements';
import useAuthentication from '../../hooks/useAuthentication';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import Divider from '../general/Divider';

interface AchievementFeedCardProps {
  data: AchievementFeedData;
}

const AchievementFeedCard: React.FC<AchievementFeedCardProps> = ({ data }: AchievementFeedCardProps) => {
  const auth = useAuthentication();

  return (
    <View style={styles.card}>
      <View style={styles.main}>
        <View style={styles.infoContainer}>
          <TouchableProfile user_id={data.user.id} name={data.user.name}>
            <View style={styles.topBar}>
              <Avatar
                rounded
                source={{ uri: data.user.picture ? data.user.picture : defaultUserProfile.picture }}
                size={'medium'}
              />
              <View style={{ marginLeft: Spacing.smaller, width: '80%' }}>
                <Text style={styles.nameText}>{data.user.name}</Text>
                <Text style={styles.timeText}>{timeStampToPresentable(data.createdAt)}</Text>
              </View>
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
      <Divider style={{ borderColor: Colors.gray800 }} />
      <Reaction feed_id={data.id} user_id={auth.user?.uid ?? ''} likes={data.likes} />
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
    marginVertical: Spacing.smallest,
  },
  infoContainer: {
    width: '68%',
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
    lineHeight: 30,
    marginTop: Spacing.smallest,
  },
  timeText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
    flexWrap: 'wrap',
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
  achievement: {
    width: '35%',
    marginTop: Spacing.base,
  },
});

export default AchievementFeedCard;
