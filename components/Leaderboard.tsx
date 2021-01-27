import { ApolloQueryResult } from '@apollo/client';
import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HighscoreQuery } from '../graphql/queries/Highscore.generated';
import { Colors, Spacing, Typography } from '../theme';

interface SortParam {
  data: Item[];
  sort?: (data: Item[]) => [];
}

interface LeaderboardProps {
  data: Item[];
  sort?: (data: Item[]) => [];
  onRowPress?: (item: Item, index: number) => void;
  renderItem?: (item: Item, index: number) => JSX.Element;
  containerStyle?: Record<string, unknown>;
  rowStyle?: Record<string, unknown>;
  scoreStyle?: Record<string, unknown>;
  rankStyle?: Record<string, unknown>;
  labelStyle?: Record<string, unknown>;
  avatarStyle?: Record<string, unknown>;
  oddRowColor?: string;
  evenRowColor?: string;
  refetch?: () => Promise<ApolloQueryResult<HighscoreQuery>>;
}

export type Item = {
  id: string;
  name: string;
  score: number | null;
  picture?: string;
};

const Leaderboard = (props: LeaderboardProps) => {
  const [sortedData, setSortedData] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const { data, sort } = props;
    setSortedData(sortData({ data, sort }));
  }, [props.data]);

  const onRefresh = useCallback(async () => {
    if (props.refetch) {
      setRefreshing(true);
      await props.refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  const defaultRenderItem = (item: Item, index: number) => {
    const evenColor = props.evenRowColor || Colors.black;
    const oddColor = props.oddRowColor || Colors.almostBlack;
    const rowColor = index % 2 === 0 ? evenColor : oddColor;

    const rowJSx = (
      <View key={item.id} style={[styles.row, props.rowStyle, { backgroundColor: rowColor }]}>
        <View style={styles.left}>
          <Text
            style={[styles.text, styles.rank, props.rankStyle, index < 9 ? styles.singleDidget : styles.doubleDidget]}>
            {index + 1}
          </Text>
          {item.picture && <Image source={{ uri: item.picture }} style={[styles.avatar, props.avatarStyle]} />}
          <Text style={[styles.text, styles.label, props.labelStyle]} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <Text style={[styles.text, styles.score, props.scoreStyle]}>{item.score || 0}</Text>
      </View>
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sortedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => renderItemS(item, index)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
            tintColor={Colors.blue}
            colors={[Colors.blue]}
            progressBackgroundColor={Colors.transparent}
          />
        }
      />
    </SafeAreaView>
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
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  row: {
    paddingTop: Spacing.base,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rank: {
    fontSize: 17,
    fontWeight: 'bold',
    marginRight: 5,
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
    fontSize: 17,
    flex: 1,
    paddingRight: 80,
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    right: 15,
    paddingLeft: Spacing.base,
  },
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 30 / 2,
    marginRight: 10,
  },
  text: {
    ...Typography.bodyText,
  },
});

export default Leaderboard;
