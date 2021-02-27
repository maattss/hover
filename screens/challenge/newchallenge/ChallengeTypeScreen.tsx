import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Loading from '../../../components/general/Loading';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import { RouteProp } from '@react-navigation/native';
import { ChallengeTypeFragmentFragment } from '../../../graphql/Fragments.generated';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { StackNavigationProp } from '@react-navigation/stack';
import { useChallengeTypesQuery } from '../../../graphql/queries/ChallengeTypes.generated';
import { MenuButton } from '../../../components/general/Button';
import { Challenge_Type_Enum } from '../../../types/types';

type ChallengeTypeRouteProp = RouteProp<NewChallengeStackParamList, 'ChallengeType'>;
type NavigationProp = StackNavigationProp<NewChallengeStackParamList>;

type Props = {
  navigation: NavigationProp;
  route: ChallengeTypeRouteProp;
};
const ChallengeTypeScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const { data: challengeTypes, loading } = useChallengeTypesQuery();

  const goNext = (item: ChallengeTypeFragmentFragment) => {
    navigation.push('ChallengeRules', {
      ...route.params,
      challenge_type: item.name as Challenge_Type_Enum,
    });
  };

  const renderItem = (item: ChallengeTypeFragmentFragment, index: number) => (
    <MenuButton style={styles.challengeTypeRow} onPress={() => goNext(item)} label={item.description ?? item.name} />
  );

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1, width: '100%' }}
        ListHeaderComponent={<Text style={styles.title}>Choose challenge type</Text>}
        bounces={false}
        data={challengeTypes?.challenge_type as ChallengeTypeFragmentFragment[]}
        keyExtractor={({ name }) => name}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: Spacing.smaller,
  },
  title: {
    padding: Spacing.large,
    ...Typography.headerText,
  },
  challengeTypeRow: {
    ...Buttons.button,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.smaller,
    justifyContent: 'space-between',
    backgroundColor: Colors.gray900,
  },
  label: {
    ...Typography.headerText,
    fontSize: 20,
    marginLeft: Spacing.large,
  },
});

export default ChallengeTypeScreen;
