import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Buttons, Colors, Spacing } from '../../theme';
import PickUsersScreen from './PickUsersScreen';

const NewChallengeScreen: React.FC = () => {
  // const user_id = useAuthentication().user?.uid;
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

  /*const [participants] = useState<Challenge_Participant_Insert_Input[]>([
    { user_id: user_id, state: Challenge_Participant_State_Enum.Accepted },
    { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' },
  ]);*/

  /*const [createChallenge] = useInsertChallengeMutation({
    variables: { challenge_type: challengeType, end_date: endDate, participants: participants },
  });*/

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <PickUsersScreen />
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
