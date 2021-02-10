import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../../components/Loading';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeTypeFragmentFragment } from '../../../graphql/Fragments.generated';
import { Colors, Spacing, Typography } from '../../../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import Separator from '../../../components/Separator';
import { useChallengeTypesQuery } from '../../../graphql/queries/ChallengeTypes.generated';
import { MenuButton } from '../../../components/Button';
import { getChallengeTypeEnum } from '../../../helpers/challengeMappers';

type ChallengeTypeRouteProp = RouteProp<NewChallengeStackParamList, 'ChallengeType'>;
type NavigationProp = StackNavigationProp<NewChallengeStackParamList>;

type Props = {
  navigation: NavigationProp;
  route: ChallengeTypeRouteProp;
};
const ChallengeTypeScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { data: challengeTypes, loading } = useChallengeTypesQuery();

  const renderItem = (item: ChallengeTypeFragmentFragment) => {
    return (
      <MenuButton
        style={styles.checkboxContainer}
        onPress={() => {
          navigation.push('ChallengeRules', {
            ...route.params,
            challenge_type: getChallengeTypeEnum(item.name),
          });
        }}
        label={item.description ?? item.name}
      />
    );
  };

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={<Text style={styles.title}>What type of challenge?</Text>}
        ListHeaderComponentStyle={styles.title}
        style={styles.box}
        data={challengeTypes?.challenge_type as ChallengeTypeFragmentFragment[]}
        keyExtractor={({ name }) => name}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={() => <Separator />}
      />
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
    paddingHorizontal: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smaller,
  },
  title: {
    paddingVertical: Spacing.base,
    ...Typography.headerText,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: Colors.gray900,
    alignItems: 'center',
  },
  label: {
    ...Typography.headerText,
    fontSize: 20,
    marginLeft: Spacing.base,
  },
});

export default ChallengeTypeScreen;
