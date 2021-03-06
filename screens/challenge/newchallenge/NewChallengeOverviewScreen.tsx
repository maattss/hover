/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert } from 'react-native';
import Button from '../../../components/general/Button';
import OpponentsRowList from '../../../components/challenge/OpponentsList';
import { useInsertChallengeMutation } from '../../../graphql/mutations/InsertChallenge.generated';
import { convertToJsonRule } from '../../../helpers/challengeMappers';
import { Colors, Spacing, Typography } from '../../../theme';
import { NewChallengeStackParamList, RootTabParamList } from '../../../types/navigationTypes';
import { Challenge_Participant_Insert_Input, Challenge_Participant_State_Enum } from '../../../types/types';
import Divider from '../../../components/general/Divider';
import { generateNewChallengeDescription } from '../../../helpers/decriptionHelper';
import { getGeoFenceImage } from '../../../helpers/geoFenceCalculations';
import * as Analytics from 'expo-firebase-analytics';

type NewChallengeRouteProp = RouteProp<NewChallengeStackParamList, 'NewChallengeOverview'>;
type NavigationProp = StackNavigationProp<RootTabParamList, 'Challenge'>;

type Props = {
  navigation: NavigationProp;
  route: NewChallengeRouteProp;
};

const NewChallengeOverviewScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  useEffect(() => {
    Analytics.logEvent('new_challenge_overview', {
      user: route.params.user_id,
      navigateTo: 'NewChallengeOverviewScreen',
      purpose: 'Track the progress of creating av new challenge',
    });
  }, []);

  const createNewChallenge = () =>
    createChallenge({
      variables: {
        challenge_type: route.params.challenge_type,
        end_date: route.params.end_date,
        participants: toParticipantList(),
        created_by: route.params.user_id,
        rules: convertToJsonRule(route.params.rules),
      },
    })
      .then((response) => {
        navigation.navigate('Challenge');
        console.log('Challenge inserted to db', response);
        Alert.alert(
          'You have successfully challenged your friends!😍',
          'We have notified them, so now we wait for them to respond!⏳ \nPS: you can get a head start if you start tracking now!🙈',
        );
        Analytics.logEvent('new_challenge_created', {
          user: route.params.user_id,
          screen: 'NewChallengeOverviewScreen',
          purpose: 'Track the progress of creating av new challenge',
        });
      })
      .catch((error) => console.error('Mutation error', error.message));

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

        <View style={styles.infoContainer}>
          <Text style={{ ...Typography.bodyText }}>
            {generateNewChallengeDescription(
              route.params.challenge_type,
              route.params.rules,
              route.params.end_date,
              route.params.participants,
            )}
          </Text>
        </View>
        <Divider />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Against</Text>
          <OpponentsRowList opponents={route.params.participants} />
        </View>
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
            <Image source={{ uri: getGeoFenceImage(route.params.rules.category) }} style={styles.categoryIcon} />
          </View>
        )}
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Before</Text>
          <Text style={styles.infoTextSmall}>{new Date(route.params.end_date).toDateString()}</Text>
        </View>
      </View>
      <Button onPress={createNewChallenge}>Create challenge</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.smaller,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spacing.smallest,
    alignItems: 'center',
  },
  infoText: {
    ...Typography.largeBodyText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoTextSmall: {
    ...Typography.largeBodyText,
    fontSize: 18,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    marginVertical: Spacing.smallest,
  },
});

export default NewChallengeOverviewScreen;
