import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Challenge_Participant_Insert_Input, Challenge_Participant_State_Enum } from '../../types/types';
import { Avatar, CheckBox } from 'react-native-elements';
import Loading from '../../components/Loading';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetFriendsQuery } from '../../graphql/queries/Friends.generated';
import { ListUserFragmentFragment } from '../../graphql/Fragments.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';

type PickUsersRouteProp = RouteProp<ChallengeStackParamList, 'PickUsers'>;

type Props = {
  route: PickUsersRouteProp;
};
const PickUsersScreen: React.FC<Props> = ({ route }: Props) => {
  const { data: friends, loading } = useGetFriendsQuery({
    variables: { user_id: route.params.user_id },
  });

  const participants: Challenge_Participant_Insert_Input[] = [
    { user_id: route.params.user_id, state: Challenge_Participant_State_Enum.Accepted },
  ];

  if (loading) return <Loading />;

  const onChecked = (id: string) => {
    const index = participants.findIndex((x) => x.user_id == id);
    if (index > -1) {
      participants.splice(index, 1);
    } else {
      participants.push({ user_id: id });
    }
    console.log(participants);
  };

  const renderItem = (item: ListUserFragmentFragment) => {
    console.log(item.name);
    return <FriendItem item={item} onValueChanged={() => onChecked(item.id)} />;
  };

  return (
    <View>
      <FlatList
        data={friends?.users as ListUserFragmentFragment[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
      />
    </View>
  );
};

interface FriendItemProps {
  item: ListUserFragmentFragment;
  onValueChanged: (id: string) => void;
}

const FriendItem: React.FC<FriendItemProps> = (props: FriendItemProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const onPressed = () => {
    props.onValueChanged(props.item.id);
    setChecked(!checked);
  };
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPressed}>
      <CheckBox
        center
        onPress={onPressed}
        size={30}
        checkedIcon="check-circle"
        uncheckedIcon="circle"
        checked={checked}
      />
      <Avatar
        rounded
        source={{
          uri: props.item.picture,
        }}
      />
      <Text style={styles.label}>{props.item.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.gray900,
    marginVertical: Spacing.smallest,
    alignItems: 'center',
  },
  checkbox: {
    alignSelf: 'center',
    ...Buttons.buttonText,
  },
  label: {
    ...Typography.headerText,
    fontSize: 20,
    marginLeft: Spacing.base,
  },
});

export default PickUsersScreen;
