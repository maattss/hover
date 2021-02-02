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

type ProfileScreenRouteProp = RouteProp<ChallengeStackParamList, 'PendingChallenges'>;

type Props = {
  route: ProfileScreenRouteProp;
};

const PendingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
        Accept challenges to compete with other players
      </Text>
      <PendingChallengeList challenges={route.params.pendingChallenges} refetch={route.params.refetch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default PendingChallengesScreen;
