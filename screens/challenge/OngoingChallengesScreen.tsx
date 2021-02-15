import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';
import { Challenge } from '../../types/challengeTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Spacing, Typography } from '../../theme';
import { convertToChallenge } from '../../helpers/objectMappers';
import { useGetOngoingChallengesQuery } from '../../graphql/queries/GetOngoingChallenges.generated';
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
  const [limit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const { data, loading, error, fetchMore } = useGetOngoingChallengesQuery({
    variables: { user_id: route.params.user_id, limit: limit, offset: offset },
    nextFetchPolicy: 'network-only',
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
  }, [data, fetchMore]);

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
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>Here are your active challenges.</Text>
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

export default OngoingChallengesScreen;
