import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PendingChallenge } from '../../types/challengeTypes';
import PendingChallengeList from '../../components/challenge/PendingChallengesList';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Spacing, Typography } from '../../theme';

export interface PendingChallengesScreenProps {
  pendingChallenges: PendingChallenge[];
  refetch: () => void;
}

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'PendingChallenges'>;

type Props = {
  route: ChallengeScreenRouteProp;
};

const ListHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
        Accept challenges to compete with other players
      </Text>
    </View>
  );
};

const PendingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  return (
    <PendingChallengeList
      challenges={route.params.pendingChallenges}
      refetch={route.params.refetch}
      listHeader={ListHeader}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PendingChallengesScreen;
