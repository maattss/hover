import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar, CheckBox } from 'react-native-elements';
import Loading from '../../components/general/Loading';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetFriendsQuery } from '../../graphql/queries/Friends.generated';
import { ListUserFragmentFragment } from '../../graphql/Fragments.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import Button from '../../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { Challenge_Participant_Insert_Input } from '../../types/types';

type PickUsersRouteProp = RouteProp<ChallengeStackParamList, 'PickUsers'>;
type NavigationProp = StackNavigationProp<ChallengeStackParamList, 'NewChallenge'>;

type Props = {
  navigation: NavigationProp;
  route: PickUsersRouteProp;
};
const PickUsersScreen: React.FC<Props> = ({
  route: {
    params: { user_id, participants, setParticipants },
  },
  navigation: { goBack },
}: Props) => {
  const { data: friends, loading } = useGetFriendsQuery({
    variables: { user_id: user_id },
  });

  const [localParticipants, setLocalParticipants] = useState<Challenge_Participant_Insert_Input[]>(participants);

  if (loading) return <Loading />;

  const onChecked = (id: string) => {
    const index = localParticipants.findIndex((x) => x.user_id == id);
    const newParticipants = localParticipants;
    if (index > -1) {
      newParticipants.splice(index, 1);
    } else {
      newParticipants.push({ user_id: id });
    }

    setLocalParticipants(newParticipants);
    console.log(newParticipants);
  };

  const isFriendChecked = (id: string) => {
    if (localParticipants.findIndex((x) => x.user_id == id) > -1) return true;
    return false;
  };

  const renderItem = (item: ListUserFragmentFragment) => {
    console.log(item.name);
    return <FriendItem item={item} checked={isFriendChecked(item.id)} onValueChanged={() => onChecked(item.id)} />;
  };
  const renderSeparator = () => <View style={styles.seperator} />;
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.box}
        data={friends?.users as ListUserFragmentFragment[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={renderSeparator}
      />
      <Button
        onPress={() => {
          setParticipants(localParticipants);
          goBack();
        }}>
        Save Participants
      </Button>
    </View>
  );
};

interface FriendItemProps {
  item: ListUserFragmentFragment;
  checked: boolean;
  onValueChanged: (id: string) => void;
}

const FriendItem: React.FC<FriendItemProps> = (props: FriendItemProps) => {
  const [checked, setChecked] = useState<boolean>(props.checked);
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
          uri: props.item.picture ?? '',
        }}
      />
      <Text style={styles.label}>{props.item.name}</Text>
    </TouchableOpacity>
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
    paddingHorizontal: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smaller,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.gray900,
    alignItems: 'center',
  },
  seperator: {
    backgroundColor: Colors.gray800,
    height: 0.5,
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
