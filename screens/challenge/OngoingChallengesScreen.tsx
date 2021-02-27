import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Challenge } from '../../types/challengeTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Spacing, Typography } from '../../theme';
import { convertToChallenge } from '../../helpers/objectMappers';
import { useGetOngoingChallengesQuery } from '../../graphql/queries/GetOngoingChallenges.generated';
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import OngoingChallengeCard from '../../components/challenge/OngoingChallengeCard';

export interface OngoingChallengesScreenProps {
  user_id: string;
  ongoingChallenges: Challenge[];
}

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'OngoingChallenges'>;

type Props = {
  route: ChallengeScreenRouteProp;
};

const OngoingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  const [challengeData, setChallengeData] = useState<Challenge[]>([]);
  const limit = 5;
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { data, loading, error, fetchMore } = useGetOngoingChallengesQuery({
    variables: { user_id: route.params.user_id, limit: limit, offset: offset },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.user) {
      const user = data.user;
      if (data.user.ongoing_challenges.length == 0) {
        setEndReached(true);
      } else {
        const ongoingChallenges: Challenge[] = challengeData;
        data.user.ongoing_challenges.forEach((obj) => {
          ongoingChallenges.push(convertToChallenge(obj.challenge, user));
        });
        setChallengeData(ongoingChallenges);
      }
    }
  }, [data]);

  const loadMoreChallenges = async () => {
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
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing challenges</Text>
    </View>
  );
  const renderItem = (item: Challenge) => (
    <View style={styles.cardbox}>
      <OngoingChallengeCard challenge={item} />
    </View>
  );
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? <Loading /> : null}
        {endReached ? (
          <Text style={{ ...Typography.bodyText }}>You have reached the end. There are no more challenges.</Text>
        ) : null}
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
    paddingBottom: Spacing.smaller,
  },
  footer: {
    padding: Spacing.smaller,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardbox: {
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
});

export default OngoingChallengesScreen;
