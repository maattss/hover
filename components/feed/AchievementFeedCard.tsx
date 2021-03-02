import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { AchievementFeedData } from '../../types/feedTypes';
import Achievement from '../profile/Achievement';
import { defaultUserProfile } from '../../helpers/objectMappers';
import TouchableProfile from '../general/TouchableProfile';
import Reaction from './Reaction';
import Footer from './Footer';
import { Avatar } from 'react-native-elements';

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
              <Avatar
                source={{ uri: data.user.picture ? data.user.picture : defaultUserProfile.picture }}
                size={'medium'}
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

      <Reaction />
      <Footer createdAt={data.createdAt} />
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
    marginLeft: Spacing.small,
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
    marginTop: Spacing.smallest,
  },
});

export default AchievementFeedCard;
