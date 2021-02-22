import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography, Spacing } from '../../theme';
import { ChallengeFeedData } from '../../types/feedTypes';
import { timeStampToPresentable } from '../../helpers/dateTimeHelpers';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { generateFeedChallengeDescription } from '../../helpers/decriptionHelper';
import { Avatar } from 'react-native-elements';
import Leaderboard, { Item } from '../leaderboard/Leaderboard';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import { getAchievementColor } from '../profile/Achievement';
import Divider from '../general/Divider';
import TouchableProfile from '../TouchableProfile';

type ChallengeFeedCardProps = {
  data: ChallengeFeedData;
};

const ChallengeFeedCard: React.FC<ChallengeFeedCardProps> = ({ data }: ChallengeFeedCardProps) => {
  const renderItem = (item: Item, index: number) => {
    const rowJSx = (
      <View key={item.id}>
        <ChallengeLeaderboardRow item={item} index={index} />
      </View>
    );
    return (
      <TouchableProfile user_id={item.id} name={item.name}>
        {rowJSx}
      </TouchableProfile>
    );
  };

  return (
    <View style={styles.card}>
      <View style={[styles.topBar, { padding: Spacing.smaller }]}>
        <Text style={{ ...Typography.headerText }}>We have a winner... </Text>
      </View>
      <TouchableProfile user_id={data.user.id} name={data.user.name}>
        <View style={styles.topBar}>
          <View style={styles.avatar}>
            <Avatar
              rounded
              source={{ uri: data.user.picture ? data.user.picture : defaultUserProfile.picture }}
              size={'medium'}
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.nameText}>{data.user.name}</Text>
            <Text style={styles.descriptionText}>{generateFeedChallengeDescription(data.challenge)}</Text>
          </View>
        </View>
      </TouchableProfile>
      <Divider />
      <View style={styles.main}>
        <Leaderboard
          data={data.challenge.opponents.map<Item>((item) => {
            return { id: item.user.id, name: item.user.name, picture: item.user.picture, score: item.progress } as Item;
          })}
          renderItem={renderItem}
          seperator={() => <Divider style={{ borderBottomColor: Colors.gray800 }} />}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{timeStampToPresentable(data.createdAt)}</Text>
      </View>
    </View>
  );
};

const ChallengeLeaderboardRow = ({ item, index }: { item: Item; index: number }) => {
  const iconColor = {
    color: getAchievementColor(index + 1),
  };
  const textSize =
    index == 0
      ? {
          fontSize: 28,
        }
      : {
          fontSize: 20,
        };
  const rowHeight =
    index == 0
      ? {
          height: 60,
        }
      : {
          height: 35,
        };
  return (
    <View style={[styles.row, rowHeight]}>
      <View style={styles.left}>
        <Text style={[styles.text, styles.rank, index < 9 ? styles.singleDidget : styles.doubleDidget]}>
          {index < 3 ? <FAIcon name={'medal'} style={[iconColor, textSize]} /> : index + 1}
        </Text>
        {item.picture && (
          <View style={styles.avatar}>
            <Avatar rounded source={{ uri: item.picture ? item.picture : defaultUserProfile.picture }} size={'small'} />
          </View>
        )}
        <Text style={[styles.text, styles.label, textSize]} numberOfLines={1}>
          {item.name}
        </Text>
      </View>
      <Text style={[styles.text, styles.score, textSize]}>{item.score || 0}</Text>
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
  avatar: {
    marginRight: Spacing.small,
    alignSelf: 'center',
  },
  infoContainer: {
    padding: Spacing.smaller,
    justifyContent: 'center',
    flexShrink: 1,
  },
  nameText: {
    ...Typography.headerText,
    fontSize: 20,
  },
  descriptionText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontStyle: 'italic',
    flexWrap: 'wrap',
  },
  main: {
    borderRadius: Spacing.smaller,
    backgroundColor: Colors.almostBlack,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.small,
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
  row: {
    paddingVertical: Spacing.smallest,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  score: {
    fontWeight: 'bold',
    position: 'absolute',
    right: Spacing.base,
    paddingLeft: Spacing.base,
  },
  text: {
    ...Typography.bodyText,
  },
});

export default ChallengeFeedCard;
