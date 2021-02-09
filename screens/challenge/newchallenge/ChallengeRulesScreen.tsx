import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import { Challenge_Type_Enum } from '../../../types/types';

type ChallengeRulesRouteProp = RouteProp<NewChallengeStackParamList, 'ChallengeRules'>;
type NavigationProp = StackNavigationProp<NewChallengeStackParamList>;

type Props = {
  navigation: NavigationProp;
  route: ChallengeRulesRouteProp;
};

const ChallengeRulesScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const [challengeType] = useState<Challenge_Type_Enum>(Challenge_Type_Enum.Score);
  const [endDate] = useState<Date>(new Date('2021-02-11'));
  const [rules] = useState<string>(JSON.stringify({ score: 220 }));

  const challengeTypes = Object.keys(Challenge_Type_Enum);
  const [isDisabled, setDisabled] = useState(true);

  const onRuleChange = () => {
    setDisabled(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={{ ...Typography.headerText }}>What is the challenge?</Text>

        <View style={styles.box}></View>
        <Separator />
      </View>
      <Button
        onPress={() => {
          navigation.push('NewChallengeOverview', {
            ...route.params,
            rules: rules,
            challenge_type: challengeType,
          });
          onRuleChange();
        }}
        disabled={isDisabled}>
        Save Participants
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

export default ChallengeRulesScreen;
