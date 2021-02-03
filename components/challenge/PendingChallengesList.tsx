import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { Colors } from '../../theme';
import { PendingChallenge } from '../../types/challengeTypes';
import PendingChallengeCard from './PendingChallengeCard';

interface PendingChallengeListProps {
  challenges: PendingChallenge[];
  refetch: () => void;
}

const PendingChallengeList: React.FC<PendingChallengeListProps> = (props: PendingChallengeListProps) => {
  const [challengeData, setChallengeData] = useState<PendingChallenge[]>([]);
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
  const renderItem = (item: PendingChallenge) => <PendingChallengeCard challenge={item} />;
  return (
    <SafeAreaView>
      <FlatList
        data={challengeData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => renderItem(item)}
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

export default PendingChallengeList;
