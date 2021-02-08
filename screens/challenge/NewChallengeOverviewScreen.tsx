/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../../components/Button';
import OpponentsList from '../../components/challenge/OpponentsList';
import Separator from '../../components/Separator';
import { useInsertChallengeMutation } from '../../graphql/mutations/InsertChallenge.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { ChallengeStackParamList, NewChallengeStackParamList } from '../../types/navigationTypes';
import {
  Challenge_Participant_Insert_Input,
  Challenge_Participant_State_Enum,
  Challenge_Type_Enum,
} from '../../types/types';

type NewChallengeRouteProp = RouteProp<NewChallengeStackParamList, 'NewChallengeOverview'>;
type NavigationProp = StackNavigationProp<ChallengeStackParamList, 'NewChallenge'>;

type Props = {
  navigation: NavigationProp;
  route: NewChallengeRouteProp;
};

const NewChallengeOverviewScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const [challengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  const [endDate] = useState<Date>(new Date('2021-02-11'));

  const challengeTypes = Object.keys(Challenge_Type_Enum);
  console.log('challengeTypes', challengeTypes);

  const toParticipantList = () => {
    const list: Challenge_Participant_Insert_Input[] = [
      { user_id: route.params.user_id, state: Challenge_Participant_State_Enum.Accepted },
    ];

    list.push(
      ...route.params.participants.map((item) => {
        return {
          user_id: item.id,
        };
      }),
    );
    return list;
  };

  const [createChallenge] = useInsertChallengeMutation();

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={{ ...Typography.headerText }}>Overview</Text>

        <View style={styles.box}>
          <OpponentsList opponents={route.params.participants} />
        </View>

        <Separator />
      </View>
      <Button
        onPress={() =>
          createChallenge({
            variables: {
              challenge_type: challengeType,
              end_date: endDate,
              participants: toParticipantList(),
              created_by: route.params.user_id,
            },
          }).then(() => navigation.pop())
        }>
        Challenge!
      </Button>
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
  opponentContainer: {
    paddingTop: Spacing.base,
    justifyContent: 'flex-end',
    width: '100%',
    left: '20%',
  },
  opponentHeaderText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: Spacing.base,
  },
  challengeButton: {
    ...Buttons.button,
    backgroundColor: Colors.green,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});

export default NewChallengeOverviewScreen;
