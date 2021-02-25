import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Challenge } from '../../types/challengeTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Spacing, Typography } from '../../theme';
import PendingChallengeCard from '../../components/challenge/PendingChallengeCard';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { convertToChallenge } from '../../helpers/objectMappers';
import { useGetPendingChallengesQuery } from '../../graphql/queries/GetPendingChallenges.generated';

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'PendingChallenges'>;
type Props = {
  route: ChallengeScreenRouteProp;
};

const PendingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  const [challengeData, setChallengeData] = useState<Challenge[]>([]);

  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { data, loading, error, fetchMore } = useGetPendingChallengesQuery({
    variables: { user_id: route.params.user_id, limit: limit, offset: offset },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.user) {
      const user = data.user;
      if (data.user.pending_challenges.length == 0) {
        setEndReached(true);
      } else {
        const pendingChallenges: Challenge[] = challengeData;
        data.user.pending_challenges.forEach((obj) => {
          pendingChallenges.push(convertToChallenge(obj.challenge, user));
        });
        setChallengeData(pendingChallenges);
      }
    }
  }, [data]);

  const loadMoreChallenges = () => {
    if (!endReached && !loading) {
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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
        Accept challenges to compete with other players
      </Text>
    </View>
  );
  const renderItem = (item: Challenge) => (
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

  if (error) return <Error message={error.message} apolloError={error} />;

  return (
    <FlatList
      data={challengeData}
      bounces={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => renderItem(item)}
      onEndReachedThreshold={0.5}
      onEndReached={loadMoreChallenges}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
    />
  );
};

const styles = StyleSheet.create({
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
