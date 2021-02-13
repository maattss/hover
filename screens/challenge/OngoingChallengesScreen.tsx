import React from 'react';
import { View, Text } from 'react-native';
import { OngoingChallenge } from '../../types/challengeTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { Spacing, Typography } from '../../theme';
import OngoingChallengesList from '../../components/challenge/OngoingChallengesList';

export interface OngoingChallengesScreenProps {
  user_id: string;
  ongoingChallenges: OngoingChallenge[];
  refetch: () => void;
}

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'OngoingChallenges'>;

type Props = {
  route: ChallengeScreenRouteProp;
};
const ListHeader = () => (
  <View>
    <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing challenges</Text>
    <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>Here are your active challenges.</Text>
  </View>
);
const OngoingChallengesScreen: React.FC<Props> = ({ route }: Props) => {
  return (
    <OngoingChallengesList
      user_id={route.params.user_id}
      initial_challenges={route.params.ongoingChallenges}
      listHeader={<ListHeader />}
    />
  );
};

export default OngoingChallengesScreen;
