import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ListView,
  RefreshControl,
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetChallengesQuery } from '../../graphql/queries/GetChallenges.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import useAuthentication from '../../hooks/useAuthentication';
import { OngoingChallenge, PendingChallenge } from '../../types/challengeTypes';
import { convertChallenge } from '../../helpers/objectMappers';
import { ScrollView } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import PendingChallengeCard from '../../components/challenge/PendingChallengeCard';
import OngoingChallengesList from '../../components/challenge/OngoingChallengesList';

type NavigationProp = StackNavigationProp<ChallengeStackParamList>;

export type ChallengesProps = {
  navigation: NavigationProp;
};

const ChallengeScreen: React.FC<ChallengesProps> = (props: ChallengesProps) => {
  const user_id = useAuthentication().user?.uid;
  const [refreshing, setRefreshing] = useState(false);

  const [pendingChallenges, setPendingChallenges] = useState<PendingChallenge[]>();
  const [ongoingChallenges, setOngoingChallenges] = useState<OngoingChallenge[]>();

  const { data: challengeData, loading, error, refetch } = useGetChallengesQuery({
    variables: { user_id: user_id ? user_id : '' },
  });

  useEffect(() => {
    if (challengeData && challengeData.user) {
      const { pendingChallenges, ongoingChallenges } = convertChallenge(challengeData);
      setPendingChallenges(pendingChallenges);
      setOngoingChallenges(ongoingChallenges);
    }
  }, [challengeData]);

  const onRefresh = useCallback(async () => {
    if (refetch) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={Colors.blue} />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>{error.message}</Text>
      </View>
    );
  }
  type ItemProp = { section: string; data: [] };
  const sections: ItemProp[] = [
    { section: 'Pending', data: [] },
    { section: 'Ongoing', data: [] },
    { section: 'NewChallenge', data: [] },
  ];

  const Item = ({ section }: ItemProp) => {
    if (section === 'Pending' && pendingChallenges) {
      return renderPendingChallenges(props, pendingChallenges, refetch);
    }
    if (section === 'Ongoing' && ongoingChallenges) {
      return renderOngoingChallenges(ongoingChallenges);
    }
    if (section === 'NewChallenge' && pendingChallenges) {
      return (
        <View style={styles.box}>
          <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Want a new challenge?</Text>
          <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
            Create a challenge for you and your friends!
          </Text>
          <TouchableOpacity style={styles.challengeButton} onPress={() => props.navigation.push('NewChallenge')}>
            <Text style={{ ...Buttons.buttonText }}>Create new challenge</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return <Text style={{ ...Typography.bodyText }}>{section}</Text>;
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        renderItem={({ item }) => <Item section={item} />}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}></SectionList>
    </View>
  );
};

const renderPendingChallenges = (
  { navigation }: ChallengesProps,
  pendingChallenges: PendingChallenge[],
  refetch: () => void,
) => {
  return (
    <View style={styles.box}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Pending challenges</Text>
      <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>
        Accept the challenges to compete with other players.
      </Text>
      <PendingChallengeCard challenge={pendingChallenges[0]} />
      {pendingChallenges.length > 1 && (
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => navigation.push('PendingChallenges', { pendingChallenges, refetch })}>
          <Text style={{ ...Buttons.buttonText }}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const renderOngoingChallenges = (ongoingChallenges: OngoingChallenge[]) => {
  return (
    <View style={styles.box}>
      <Text style={{ ...Typography.headerText, marginTop: Spacing.base }}>Ongoing Challenges</Text>
      <OngoingChallengesList challenges={ongoingChallenges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    marginTop: '20%',
  },
  box: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
  challengeButton: {
    ...Buttons.button,
    backgroundColor: Colors.green,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});

export default ChallengeScreen;
