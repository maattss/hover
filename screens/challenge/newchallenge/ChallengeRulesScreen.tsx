import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../../../components/Button';
import Separator from '../../../components/Separator';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { ChallengeRules } from '../../../types/challengeTypes';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';

type ChallengeRulesRouteProp = RouteProp<NewChallengeStackParamList, 'ChallengeRules'>;
type NavigationProp = StackNavigationProp<NewChallengeStackParamList>;

type Props = {
  navigation: NavigationProp;
  route: ChallengeRulesRouteProp;
};

const ChallengeRulesScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const [rules] = useState<ChallengeRules>({
    category: 'CULTURE',
    score: 200,
  });
  const [endDate] = useState<Date>(new Date('2021-02-11'));

  useEffect(() => {
    console.log(rules);
  }, [rules]);

  const [isDisabled, setDisabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={{ ...Typography.headerText }}>What is the challenge?</Text>
        <Separator />

        <View style={styles.box}></View>
        <Separator />
      </View>
      <Button
        onPress={() => {
          navigation.push('NewChallengeOverview', {
            ...route.params,
            rules: rules,
            end_date: endDate,
          });
        }}
        disabled={isDisabled}>
        Save Rules
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
