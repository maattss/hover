import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Avatar, CheckBox } from 'react-native-elements';
import Loading from '../../../components/general/Loading';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetFriendsQuery } from '../../../graphql/queries/Friends.generated';
import { ListUserFragmentFragment } from '../../../graphql/Fragments.generated';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import Button from '../../../components/general/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import Divider from '../../../components/general/Divider';
import { defaultUserProfile } from '../../../helpers/objectMappers';

type PickUsersRouteProp = RouteProp<NewChallengeStackParamList, 'PickUsers'>;
type NavigationProp = StackNavigationProp<NewChallengeStackParamList>;

type Props = {
  navigation: NavigationProp;
  route: PickUsersRouteProp;
};
const PickUsersScreen: React.FC<Props> = ({
  route: {
    params: { user_id },
  },
  navigation,
}: Props) => {
  const { data: friends, loading } = useGetFriendsQuery({
    variables: { user_id: user_id },
  });

  const [participants, setParticipants] = useState<ListUserFragmentFragment[]>([]);
  const [isDisabled, setDisabled] = useState(participants.length == 0);

  const onChecked = (user: ListUserFragmentFragment) => {
    const index = participants.findIndex((x) => x.id == user.id);
    const newParticipants = participants;
    if (index > -1) {
      newParticipants.splice(index, 1);
    } else {
      newParticipants.push(user);
    }

    setParticipants(newParticipants);
    setDisabled(participants.length == 0);
  };

  const isFriendChecked = (id: string) => {
    if (participants.findIndex((x) => x.id == id) > -1) return true;
    return false;
  };

  const renderItem = (item: ListUserFragmentFragment) => {
    return <FriendItem item={item} checked={isFriendChecked(item.id)} onValueChanged={() => onChecked(item)} />;
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Choose opponents</Text>
            <Divider />
          </>
        }
        style={styles.box}
        data={friends?.users as ListUserFragmentFragment[]}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={() => <Divider />}
        ListFooterComponent={<Divider />}
      />
      <Button
        onPress={() =>
          isDisabled
            ? Alert.alert('You are not finished', 'Choose a least one opponent to proceed!', [{ text: 'OK' }])
            : navigation.push('ChallengeType', {
                user_id: user_id,
                participants: participants,
              })
        }
        style={isDisabled ? { backgroundColor: Colors.gray600 } : {}}>
        Next
      </Button>
    </View>
  );
};

interface FriendItemProps {
  item: ListUserFragmentFragment;
  checked: boolean;
  onValueChanged: (id: ListUserFragmentFragment) => void;
}

const FriendItem: React.FC<FriendItemProps> = (props: FriendItemProps) => {
  const [checked, setChecked] = useState<boolean>(props.checked);
  const onPressed = () => {
    props.onValueChanged(props.item);
    setChecked(!checked);
  };
  return (
    <TouchableOpacity style={styles.friendRow} onPress={onPressed}>
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
          uri: props.item.picture ?? defaultUserProfile.picture,
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
  title: {
    paddingVertical: Spacing.base,
    ...Typography.headerText,
  },
  friendRow: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.gray900,
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
