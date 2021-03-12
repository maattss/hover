import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { ChallengeFeedData } from '../../types/feedTypes';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { generateFeedChallengeDescription } from '../../helpers/decriptionHelper';
import { Avatar } from 'react-native-elements';
import Leaderboard, { Item } from '../leaderboard/Leaderboard';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { getAchievementColor } from '../general/Achievement';
import TouchableProfile from '../general/TouchableProfile';
import Reaction from './Reaction';
import useAuthentication from '../../hooks/useAuthentication';

type ChallengeFeedCardProps = {
  data: ChallengeFeedData;
};

const ChallengeFeedCard: React.FC<ChallengeFeedCardProps> = ({ data }: ChallengeFeedCardProps) => {
  const auth = useAuthentication();

  const checkName = (name: string, id: string) => {
    if (auth.user?.uid === id) return 'You';
    return name;
  };

  const renderItem = (item: Item, index: number) => (
    <TouchableProfile user_id={item.id} name={item.name}>
      <View key={item.id}>
        <ChallengeLeaderboardRow item={item} index={index} />
      </View>
    </TouchableProfile>
  );

  const listData = data.challenge.opponents.map<Item>((item) => {
    return {
      id: item.user.id,
      name: checkName(item.user.name, item.user.id),
      picture: item.user.picture,
      score: item.progress,
    } as Item;
  });

  return (
    <View style={styles.card}>
      <View style={styles.topBar}>
        <Text style={{ ...Typography.headerText }}>We have a winner!</Text>
      </View>
      <TouchableProfile user_id={data.user.id} name={data.user.name}>
        <View style={styles.topBar}>
          <View style={styles.infoContainer}>
            <Text style={styles.descriptionText}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{data.user.name} </Text>
              {generateFeedChallengeDescription(data.challenge)}
            </Text>
          </View>
        </View>
      </TouchableProfile>
      <View style={styles.main}>
        <Leaderboard data={listData} renderItem={renderItem} />
      </View>
      <Reaction feed_id={data.id} user_id={auth.user?.uid ?? ''} likes={data.likes} />
    </View>
  );
};

const ChallengeLeaderboardRow = ({ item, index }: { item: Item; index: number }) => {
  const iconStyle = {
    color: getAchievementColor(index + 1),
    fontSize: 30,
  };
  const border = {
    borderBottomColor: getAchievementColor(index + 1),
    borderBottomWidth: 3,
    borderRadius: 0,
  };
  return (
    <View style={[styles.row, border]}>
      <View style={styles.left}>
        <Text style={[{ ...Typography.bodyText }, styles.rank, index < 9 ? styles.singleDidget : styles.doubleDidget]}>
          {index < 3 ? <FAIcon name={'medal'} style={iconStyle} /> : index + 1}
        </Text>
        {item.picture !== '' && (
          <View style={styles.avatar}>
            <Avatar
              rounded
              source={{ uri: item.picture && item.picture !== '' ? item.picture : defaultUserProfile.picture }}
              size={'small'}
            />
          </View>
        )}
        <Text style={[{ ...Typography.bodyText }, styles.label]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <Text style={[{ ...Typography.bodyText }, styles.score]}>{item.score || 0}</Text>
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
    justifyContent: 'center',
  },
  avatar: {
    marginRight: Spacing.small,
    alignSelf: 'center',
  },
  infoContainer: {
    justifyContent: 'center',
    paddingVertical: Spacing.smaller,
  },
  descriptionText: {
    ...Typography.bodyText,
    flexWrap: 'wrap',
  },
  main: {
    marginBottom: Spacing.small,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: Spacing.smallest,
    paddingVertical: Spacing.smaller,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontWeight: 'bold',
    marginRight: 5,
    width: '15%',
  },
  singleDidget: {
    paddingLeft: Spacing.base,
    paddingRight: 6,
  },
  doubleDidget: {
    paddingLeft: 10,
    paddingRight: 2,
  },
  label: {
    flex: 1,
    fontSize: 20,
  },
  score: {
    fontWeight: 'bold',
    position: 'absolute',
    right: Spacing.base,
    paddingLeft: Spacing.base,
    fontSize: 20,
  },
  text: {
    ...Typography.bodyText,
  },
});

export default ChallengeFeedCard;
