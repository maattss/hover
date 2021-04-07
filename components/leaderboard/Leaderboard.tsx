import { ApolloQueryResult } from '@apollo/client';
import React, { useState, useEffect, ReactElement } from 'react';
import { FlatList, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Avatar } from 'react-native-elements';
import { HighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { defaultUserProfile } from '../../helpers/objectMappers';
import { Colors, Spacing, Typography } from '../../theme';
import TouchableProfile from '../general/TouchableProfile';
import * as Analytics from 'expo-firebase-analytics';

interface SortParam {
  data: Item[];
  sort?: (data: Item[]) => [];
}

interface LeaderboardProps {
  data: Item[];
  header?: ReactElement;
  sort?: (data: Item[]) => [];
  onRowPress?: (item: Item, index: number) => void;
  renderItem?: (item: Item, index: number) => JSX.Element;
  seperator?: React.FC;
  containerStyle?: ViewStyle;
  rowStyle?: ViewStyle;
  scoreStyle?: TextStyle;
  rankStyle?: TextStyle;
  labelStyle?: TextStyle;
  avatarStyle?: ViewStyle;
  oddRowColor?: string;
  evenRowColor?: string;
  refetch?: () => Promise<ApolloQueryResult<HighscoreQuery>>;
}

export type Item = {
  id: string;
  name: string;
  score: number | null;
  picture?: string;
  specialRow?: boolean;
};

const Leaderboard: React.FC<LeaderboardProps> = (props: LeaderboardProps) => {
  const [sortedData, setSortedData] = useState<Item[]>([]);

  useEffect(() => {
    const { data, sort } = props;
    setSortedData(sortData({ data, sort }));
  }, [props.data]);

  const defaultRenderItem = (item: Item, index: number) => {
    const evenColor = props.evenRowColor || Colors.almostBlack;
    const oddColor = props.oddRowColor || Colors.black;
    const rowColor = item.specialRow ? Colors.blueTransparent : index % 2 === 0 ? evenColor : oddColor;

    const rowJSx = (
      <TouchableProfile
        user_id={item.id}
        name={item.name}
        key={item.id}
        onPress={() =>
          Analytics.logEvent('OpenProfile', {
            navigateFrom: 'LeaderboardScreen',
            user: item.id,
            navigateTo: 'ProfileScreen',
            purpose: 'Viewing more info on a user',
          })
        }>
        <View key={item.id} style={[styles.row, props.rowStyle, { backgroundColor: rowColor }]}>
          <View style={styles.left}>
            <Text
              style={[
                styles.text,
                styles.rank,
                props.rankStyle,
                index < 9 ? styles.singleDidget : styles.doubleDidget,
              ]}>
              {index + 1}
            </Text>
            <View style={[styles.avatar, props.avatarStyle]}>
              <Avatar
                rounded
                source={{ uri: item.picture && item.picture !== '' ? item.picture : defaultUserProfile.picture }}
                size={'small'}
              />
            </View>
            <Text style={[styles.text, styles.label, props.labelStyle]} numberOfLines={1}>
              {item.name}
            </Text>
          </View>
          <Text style={[styles.text, styles.score, props.scoreStyle]}>{item.score || 0}</Text>
        </View>
      </TouchableProfile>
    );

    return props.onRowPress ? (
      <TouchableOpacity onPress={() => props.onRowPress && props.onRowPress(item, index)}>{rowJSx}</TouchableOpacity>
    ) : (
      rowJSx
    );
  };

  const renderItemS = (item: Item, index: number) =>
    props.renderItem ? props.renderItem(item, index) : defaultRenderItem(item, index);

  return (
    <FlatList
      ListHeaderComponent={props.header}
      stickyHeaderIndices={[0]}
      contentContainerStyle={props.containerStyle}
      data={sortedData}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item, index }) => renderItemS(item, index)}
      ItemSeparatorComponent={props.seperator}
    />
  );
};

export const sortData = (sortParam: SortParam) => {
  const { data, sort } = sortParam;
  if (sort) sort(data);
  if (Array.isArray(data)) {
    return (
      data &&
      data.sort((item1, item2) => {
        if (item2.score === null) return -1;
        if (item1.score === null) return 1;
        return item2.score - item1.score;
      })
    );
  }
  return [];
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: Spacing.small,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    ...Typography.headerText,
    fontSize: 20,
    marginRight: Spacing.smallest,
  },
  singleDidget: {
    paddingLeft: Spacing.base,
    paddingRight: Spacing.smaller,
  },
  doubleDidget: {
    paddingLeft: Spacing.small,
    paddingRight: Spacing.tiny,
  },
  label: {
    fontSize: 17,
    paddingRight: 80,
  },
  score: {
    fontSize: 22,
    fontWeight: 'bold',
    position: 'absolute',
    right: Spacing.base,
    paddingLeft: Spacing.base,
  },
  avatar: {
    marginRight: Spacing.small,
  },
  text: {
    ...Typography.bodyText,
  },
});

export default Leaderboard;
