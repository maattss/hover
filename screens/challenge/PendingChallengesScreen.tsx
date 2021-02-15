import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, SafeAreaView, FlatList, Alert } from 'react-native';
import { PendingChallenge } from '../../types/challengeTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Colors, Spacing, Typography } from '../../theme';
import PendingChallengeCard from '../../components/challenge/PendingChallengeCard';
import Loading from '../../components/general/Loading';
import { convertToChallenge } from '../../helpers/objectMappers';
import { useGetPendingChallengesQuery } from '../../graphql/queries/GetPendingChallenges.generated';

export interface PendingChallengesScreenProps {
  pendingChallenges: PendingChallenge[];
  user_id: string;
}

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'PendingChallenges'>;
type Props = {
  route: ChallengeScreenRouteProp;
};

const PendingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  const [challengeData, setChallengeData] = useState<PendingChallenge[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { data, loading, error, refetch, fetchMore } = useGetPendingChallengesQuery({
    variables: { user_id: route.params.user_id, limit: limit, offset: offset },
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.user) {
      const user = data.user;
      if (data.user.pending_challenges.length == 0) {
        setEndReached(true);
      } else {
        const pendingChallenges: PendingChallenge[] = challengeData;
        data.user.pending_challenges.forEach((obj) => {
          pendingChallenges.push(convertToChallenge(obj.challenge, user) as PendingChallenge);
        });
        setChallengeData(pendingChallenges);
      }
    }
    console.log('useEffect');
  }, [data]);

  const loadMoreChallenges = () => {
    if (!endReached && !loading && !refreshing) {
      console.log('loadMoreChallenges');
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchMore({
        variables: {
          limit: limit,
          offset: newOffset,
        },
      });
    }
  };
  const handleRefresh = useCallback(async () => {
    if (refetch) {
      setRefreshing(true);
      setEndReached(false);
      setChallengeData([]);
      setOffset(0);
      await refetch({ offset: offset });
      setRefreshing(false);
    }
  }, [refreshing]);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
        Accept challenges to compete with other players
      </Text>
    </View>
  );
  const renderItem = (item: PendingChallenge) => (
    <View style={{ marginHorizontal: Spacing.smaller }}>
      <PendingChallengeCard challenge={item} />
    </View>
  );
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? <Loading /> : null}
        {endReached ? <Text style={{ ...Typography.bodyText }}>There are no more pending challenges.</Text> : null}
      </View>
    );
  };

  if (error) {
    console.error(error);
    Alert.alert('Error', error?.message);
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={challengeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={Colors.blue}
            colors={[Colors.blue]}
            progressBackgroundColor={Colors.transparent}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreChallenges}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: Spacing.base,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardbox: {
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
});
export default PendingChallengesScreen;
