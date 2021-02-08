/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/general/Button';
import { Buttons, Colors, Spacing } from '../../theme';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import {
  Challenge_Participant_Insert_Input,
  Challenge_Participant_State_Enum,
  Challenge_Type_Enum,
} from '../../types/types';

type NewChallengeRouteProp = RouteProp<ChallengeStackParamList, 'NewChallenge'>;
type NavigationProp = StackNavigationProp<ChallengeStackParamList, 'NewChallenge'>;

type Props = {
  navigation: NavigationProp;
  route: NewChallengeRouteProp;
};

const NewChallengeScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  //const [challengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  //const [endDate] = useState<Date>(new Date('2021-02-11'));
  //const [challengeTypeOptions, setChallengeTypeOptions] = useState<PickerItemProps[]>();

  // const { data: challengeParams } = useGetChallengeParamsQuery({ variables: { user_id: user_id } });

  /*useEffect(() => {
    setChallengeTypeOptions(
      challengeParams?.challenge_type.map<PickerItemProps>((item) => ({
        label: item.name,
        value: item.name,
      })),
    );
  }, [challengeParams]); */
  const challengeTypes = Object.keys(Challenge_Type_Enum);
  console.log('challengeTypes', challengeTypes);

  const [participants, setParticipants] = useState<Challenge_Participant_Insert_Input[]>([]);
  useEffect(() => {
    const newParticipants = participants;
    newParticipants.push({ user_id: route.params.user_id, state: Challenge_Participant_State_Enum.Accepted });
    setParticipants(newParticipants);
  }, [participants]);

  /*const [createChallenge] = useInsertChallengeMutation({
    variables: { challenge_type: challengeType, end_date: endDate, participants: participants },
  });*/

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Button
          onPress={() =>
            navigation.push('PickUsers', {
              user_id: route.params.user_id,
              participants: participants,
              setParticipants: setParticipants,
            })
          }>
          Pick users to challenge
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smaller,
  },
  challengeButton: {
    ...Buttons.button,
    backgroundColor: Colors.green,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});

export default NewChallengeScreen;
