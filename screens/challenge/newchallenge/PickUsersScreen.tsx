import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, FlatList, ViewStyle } from 'react-native';
import { Avatar, CheckBox } from 'react-native-elements';
import Loading from '../../../components/general/Loading';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';
import { useGetFriendsQuery } from '../../../graphql/queries/Friends.generated';
import { ListUserFragmentFragment } from '../../../graphql/Fragments.generated';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import Button from '../../../components/general/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { defaultUserProfile } from '../../../helpers/objectMappers';
import * as Analytics from 'expo-firebase-analytics';

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
  const [participants, setParticipants] = useState<ListUserFragmentFragment[]>([]);
  const [isDisabled, setDisabled] = useState(participants.length == 0);
  const { data: friends, loading } = useGetFriendsQuery({
    variables: { user_id: user_id },
  });

  useEffect(() => {
    Analytics.logEvent('new_challenge_pick_users', {
      user: user_id,
      screen: 'PickUsersScreen',
      purpose: 'Track the progress of creating av new challenge',
    });
  }, []);

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
  const goNext = () => {
    if (isDisabled) {
      Alert.alert('No opponents selected', 'Choose a least one opponent to proceed!');
      return;
    }

    navigation.push('ChallengeType', {
      user_id: user_id,
      participants: participants,
    });
  };

  const isFriendChecked = (id: string) => {
    if (participants.findIndex((x) => x.id == id) > -1) return true;
    return false;
  };

  const renderItem = (item: ListUserFragmentFragment, index: number) => (
    <FriendItem item={item} index={index} checked={isFriendChecked(item.id)} onValueChanged={() => onChecked(item)} />
  );

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <View style={styles.flatlist}>
        <FlatList
          ListHeaderComponent={<Text style={styles.title}>Choose opponents</Text>}
          data={friends?.users as ListUserFragmentFragment[]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => renderItem(item, index)}
          ListFooterComponent={<View style={{ height: 70 }}></View>}
        />
      </View>

      <View style={styles.stickyFooter}>
        <Button onPress={goNext} style={isDisabled ? { backgroundColor: Colors.gray600 } : {}}>
          Next
        </Button>
      </View>
    </View>
  );
};

interface FriendItemProps {
  item: ListUserFragmentFragment;
  index: number;
  checked: boolean;
  onValueChanged: (id: ListUserFragmentFragment) => void;
}

const FriendItem: React.FC<FriendItemProps> = (props: FriendItemProps) => {
  const [checked, setChecked] = useState<boolean>(props.checked);
  const onPressed = () => {
    props.onValueChanged(props.item);
    setChecked(!checked);
  };
  const getBorder = () => {
    if (checked)
      return {
        borderColor: Colors.blue,
        borderWidth: 2,
        borderStyle: 'solid',
      } as ViewStyle;
  };
  return (
    <TouchableOpacity style={[styles.friendRow, getBorder()]} onPress={onPressed}>
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
          uri: props.item.picture && props.item.picture !== '' ? props.item.picture : defaultUserProfile.picture,
        }}
      />
      <Text style={styles.label}>{props.item.name}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  flatlist: {
    width: '100%',
  },
  stickyFooter: {
    width: '100%',
    padding: Spacing.smaller,
    position: 'absolute',
    bottom: 0,
  },
  title: {
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.small,
    ...Typography.headerText,
  },
  friendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray900,
    borderColor: Colors.gray900,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: Spacing.smaller,
    padding: 0,
    marginHorizontal: Spacing.smaller,
    marginBottom: Spacing.smaller,
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
