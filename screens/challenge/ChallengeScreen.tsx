import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
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
import OngoingChallengeCard from '../../components/challenge/OngoingChallengeCard';

type NavigationProp = StackNavigationProp<ChallengeStackParamList>;

export type ChallengesProps = {
  navigation: NavigationProp;
};

const PREVIEW_SIZE = 2;

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
    console.error(error);
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>{error.message}</Text>
        <TouchableOpacity style={styles.challengeButton} onPress={() => onRefresh}>
          <Text style={{ ...Buttons.buttonText }}>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContentContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
            tintColor={Colors.blue}
            colors={[Colors.blue]}
            progressBackgroundColor={Colors.transparent}
          />
        }>
        {pendingChallenges && renderPendingChallenges(props, pendingChallenges, refetch)}
        {ongoingChallenges && renderOngoingChallenges(props, ongoingChallenges, refetch)}
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={{ ...Typography.headerText }}>Want a new challenge?</Text>
            <Text style={{ ...Typography.bodyText }}>Create a challenge for you and your friends!</Text>
          </View>
          <TouchableOpacity style={styles.challengeButton} onPress={() => props.navigation.push('NewChallenge')}>
            <Text style={{ ...Buttons.buttonText }}>Create new challenge</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const renderPendingChallenges = (
  { navigation }: ChallengesProps,
  pendingChallenges: PendingChallenge[],
  refetch: () => void,
) => {
  return (
    <View style={styles.box}>
      <View style={styles.boxTitle}>
        <Text style={{ ...Typography.headerText }}>Pending challenges</Text>
        <Text style={{ ...Typography.bodyText }}>Accept the challenges to compete with other players.</Text>
      </View>
      {pendingChallenges.slice(0, PREVIEW_SIZE).map((item, index) => (
        <View key={index} style={styles.previewContainer}>
          <PendingChallengeCard challenge={item} />
        </View>
      ))}
      {pendingChallenges.length > PREVIEW_SIZE && (
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => navigation.push('PendingChallenges', { pendingChallenges, refetch })}>
          <Text style={{ ...Buttons.buttonText }}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const renderOngoingChallenges = (
  { navigation }: ChallengesProps,
  ongoingChallenges: OngoingChallenge[],
  refetch: () => void,
) => {
  return (
    <View style={styles.box}>
      <View style={styles.boxTitle}>
        <Text style={{ ...Typography.headerText }}>Ongoing Challenges</Text>
      </View>
      {ongoingChallenges.slice(0, PREVIEW_SIZE).map((item, index) => (
        <OngoingChallengeCard key={index} challenge={item} />
      ))}
      {ongoingChallenges.length > PREVIEW_SIZE && (
        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => navigation.push('OngoingChallenges', { ongoingChallenges, refetch })}>
          <Text style={{ ...Buttons.buttonText }}>View all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  previewContainer: {
    width: '100%',
  },
  scrollView: {
    paddingHorizontal: Spacing.base,
  },
  scrollContentContainer: {
    paddingTop: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.base,
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
    flex: 1,
    alignItems: 'center',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smaller,
  },
  boxTitle: {
    marginBottom: Spacing.base,
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
