/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from '../../../components/Button';
import OpponentsList from '../../../components/challenge/OpponentsList';
import { FontAwesome5 as FA5Icon } from '@expo/vector-icons';
import Separator from '../../../components/Separator';
import { useInsertChallengeMutation } from '../../../graphql/mutations/InsertChallenge.generated';
import { convertToJsonRule } from '../../../helpers/challengeMappers';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { NewChallengeStackParamList, RootTabParamList } from '../../../types/navigationTypes';
import { Challenge_Participant_Insert_Input, Challenge_Participant_State_Enum } from '../../../types/types';
import { GeoFenceCategory } from '../../../types/geoFenceTypes';
import { getCategoryColor, getCategoryIconName } from '../../../helpers/categoryHelpers';

type NewChallengeRouteProp = RouteProp<NewChallengeStackParamList, 'NewChallengeOverview'>;
type NavigationProp = StackNavigationProp<RootTabParamList, 'Challenge'>;

type Props = {
  navigation: NavigationProp;
  route: NewChallengeRouteProp;
};

const NewChallengeOverviewScreen: React.FC<Props> = ({ route, navigation }: Props) => {
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
  const categoryColor = {
    color: getCategoryColor(GeoFenceCategory[route.params.rules?.category as keyof typeof GeoFenceCategory]),
  };
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={{ ...Typography.headerText }}>Overview</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Against</Text>
          <OpponentsList opponents={route.params.participants} />
        </View>
        <Separator />
        {route.params.rules?.score && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Goal score</Text>
            <Text style={styles.infoTextSmall}>{route.params.rules?.score}</Text>
          </View>
        )}
        {route.params.rules?.time && (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Goal time</Text>
            <Text style={styles.infoTextSmall}>{route.params.rules?.time} hours</Text>
          </View>
        )}
        {route.params.rules?.category && (
          <View style={[styles.infoContainer, { marginBottom: 0 }]}>
            <Text style={styles.infoText}>Category</Text>
            <FA5Icon
              style={[styles.categoryIcon, categoryColor]}
              name={getCategoryIconName(
                GeoFenceCategory[route.params.rules?.category as keyof typeof GeoFenceCategory],
              )}
            />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Before</Text>
          <Text style={styles.infoTextSmall}>{route.params.end_date.toDateString()}</Text>
        </View>
      </View>
      <Button
        onPress={() =>
          createChallenge({
            variables: {
              challenge_type: route.params.challenge_type,
              end_date: route.params.end_date.toDateString(),
              participants: toParticipantList(),
              created_by: route.params.user_id,
              rules: convertToJsonRule(route.params.rules),
            },
          }).then(() => navigation.navigate('Challenge'))
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
  middleHeaderText: {
    color: Colors.almostWhite,
    fontSize: 12,
    fontWeight: 'bold',
    paddingVertical: Spacing.base,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    alignItems: 'center',
  },
  infoText: {
    ...Typography.largeBodyText,
    fontSize: 26,
    fontWeight: 'bold',
  },
  infoTextSmall: {
    ...Typography.largeBodyText,
    fontSize: 18,
  },
  infoScore: {
    ...Typography.headerText,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  categoryIcon: {
    color: Colors.almostWhite,
    fontSize: 42,
    textAlign: 'center',
    paddingRight: Spacing.smallest,
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
