import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { OngoingChallenge } from '../../types/challengeTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Spacing, Typography } from '../../theme';
import OngoingChallengesList from '../../components/challenge/OngoingChallengesList';

export interface OngoingChallengesScreenProps {
  ongoingChallenges: OngoingChallenge[];
  refetch: () => void;
}

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'OngoingChallenges'>;

type Props = {
  route: ChallengeScreenRouteProp;
};

const OngoingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>Here are your active challenges.</Text>
      <OngoingChallengesList challenges={route.params.ongoingChallenges} refetch={route.params.refetch} />
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

export default OngoingChallengesScreen;
