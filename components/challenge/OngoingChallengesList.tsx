import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { useGetOngoingChallengesQuery } from '../../graphql/queries/GetOngoingChallenges.generated';
import { convertChallenge } from '../../helpers/objectMappers';
import { Colors, Spacing } from '../../theme';
import { OngoingChallenge } from '../../types/challengeTypes';
import Loading from '../general/Loading';
import OngoingChallengeCard from './OngoingChallengeCard';

interface OngoingChallengesListProps {
  user_id: string;
  initial_challenges: OngoingChallenge[];
  refetch?: () => void;
  listHeader?: React.ReactElement;
}

const OngoingChallengesList: React.FC<OngoingChallengesListProps> = (props: OngoingChallengesListProps) => {
  const [challengeData, setChallengeData] = useState<OngoingChallenge[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [limit, setLimit] = useState(3);

  const { data, loading, error, refetch, fetchMore } = useGetOngoingChallengesQuery({
    variables: { user_id: props.user_id, limit: 3 },
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    const { initial_challenges } = props;
    if (!data) {
      setChallengeData(initial_challenges);
    } else {
      const { ongoingChallenges } = convertChallenge(data);
      setChallengeData(ongoingChallenges);
    }
  }, [props.initial_challenges, data]);

  const onRefresh = useCallback(async () => {
    if (refetch) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  }, [refreshing]);
  const loadMoreChallenges = () => {
    const newLimit = limit + 3;
    setLimit(newLimit);
    fetchMore({
      variables: {
        limit: newLimit,
      },
    });
  };
  if (error) {
    console.error(error);
    Alert.alert('Error', error?.message);
  }
  if (loading) return <Loading />;
  const renderItem = (item: OngoingChallenge) => <OngoingChallengeCard challenge={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={challengeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
        refreshControl={
          props.refetch && (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => onRefresh()}
              tintColor={Colors.blue}
              colors={[Colors.blue]}
              progressBackgroundColor={Colors.transparent}
            />
          )
        }
        ListHeaderComponent={props.listHeader}
        ListHeaderComponentStyle={styles.headerFooterStyle}
        ListFooterComponent={<Button title={'Load more...'} onPress={loadMoreChallenges}></Button>}
        ListFooterComponentStyle={styles.headerFooterStyle}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerFooterStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: Spacing.base,
  },
});

export default OngoingChallengesList;
