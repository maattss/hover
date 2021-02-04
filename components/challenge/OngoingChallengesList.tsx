import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../theme';
import { OngoingChallenge } from '../../types/challengeTypes';
import OngoingChallengeCard from './OngoingChallengeCard';

interface OngoingChallengesListProps {
  challenges: OngoingChallenge[];
  refetch?: () => void;
  listHeader?: React.ReactElement;
}

const OngoingChallengesList: React.FC<OngoingChallengesListProps> = (props: OngoingChallengesListProps) => {
  const [challengeData, setChallengeData] = useState<OngoingChallenge[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const { challenges } = props;
    setChallengeData(challenges);
  }, [props.challenges]);

  const onRefresh = useCallback(async () => {
    if (props.refetch) {
      setRefreshing(true);
      await props.refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

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
