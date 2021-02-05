import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Challenge_Participant_Insert_Input, Challenge_Participant_State_Enum } from '../../types/types';
import CheckBox from '@react-native-community/checkbox';
import { useGetChallengeParamsQuery } from '../../graphql/queries/ChallengeParameters.generated';
import Loading from '../../components/Loading';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';

type ChallengeScreenRouteProp = RouteProp<ChallengeStackParamList, 'PickUsers'>;

type Props = {
  route: ChallengeScreenRouteProp;
};
const PickUsersScreen: React.FC<Props> = ({ route }: Props) => {
  //const [challengeOpponentsOption, setChallengeOpponentsOption] = useState<[]>();

  const { data: challengeParams, loading } = useGetChallengeParamsQuery({
    variables: { user_id: route.params.user_id },
  });

  const participants: Challenge_Participant_Insert_Input[] = [
    { user_id: route.params.user_id, state: Challenge_Participant_State_Enum.Accepted },
    //    { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' },
  ];

  if (loading) return <Loading />;

  const onChecked = () => {
    const value = { user_id: 'LqzKOPWaY9aiquOGu9SBItAfJUz2' };

    console.log(participants);
    const index = participants.indexOf(value);
    if (index > -1) {
      participants.splice(index, 1);
    } else {
      participants.push(value);
    }
    console.log(participants);
  };

  const renderItem = (item: { id: string; name: string }) => (
    <View>
      <View style={styles.checkboxContainer}>
        <CheckBox value={false} onValueChange={onChecked} style={styles.checkbox} />
        <Text style={styles.label}>{item.id}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={challengeParams?.users}
      keyExtractor={(index) => index.toString()}
      renderItem={({ item }) => renderItem(item)}
    />
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});

export default PickUsersScreen;
