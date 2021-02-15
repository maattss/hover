import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useGetChallengesQuery } from '../../graphql/queries/GetChallenges.generated';
import { Colors, Spacing, Typography } from '../../theme';
import useAuthentication from '../../hooks/useAuthentication';
import { Challenge } from '../../types/challengeTypes';
import { convertChallenge } from '../../helpers/objectMappers';
import { StackNavigationProp } from '@react-navigation/stack';
import { ChallengeStackParamList } from '../../types/navigationTypes';
import PendingChallengeCard from '../../components/challenge/PendingChallengeCard';
import OngoingChallengeCard from '../../components/challenge/OngoingChallengeCard';
import Button from '../../components/general/Button';
import Loading from '../../components/general/Loading';
import { useIsFocused } from '@react-navigation/native';

type NavigationProp = StackNavigationProp<ChallengeStackParamList>;

export type ChallengesProps = {
  navigation: NavigationProp;
};

const PREVIEW_SIZE = 2;

const ChallengeScreen: React.FC<ChallengesProps> = (props: ChallengesProps) => {
  const user_id = useAuthentication().user?.uid;
  const [refreshing, setRefreshing] = useState(false);

  const [pendingChallenges, setPendingChallenges] = useState<Challenge[]>();
  const [ongoingChallenges, setOngoingChallenges] = useState<Challenge[]>();

  const { data: challengeData, loading, error, refetch } = useGetChallengesQuery({
    variables: { user_id: user_id ? user_id : '', limit: PREVIEW_SIZE + 1 },
    fetchPolicy: 'network-only',
  });

  const handleRefresh = useCallback(async () => {
    if (refetch && !loading) {
      setRefreshing(true);
      refetch();
      setRefreshing(false);
    }
  }, [refreshing, refetch]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      handleRefresh();
    }
  }, [isFocused]);

  useEffect(() => {
    if (challengeData && challengeData.user) {
      const { pendingChallenges, ongoingChallenges } = convertChallenge(challengeData);
      setPendingChallenges(pendingChallenges);
      setOngoingChallenges(ongoingChallenges);
    }
  }, [challengeData]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={{ ...Typography.bodyText, marginTop: Spacing.base }}>{error.message}</Text>
        <Button style={styles.challengeButton} onPress={handleRefresh}>
          Refresh
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContentContainer}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          tintColor={Colors.blue}
          colors={[Colors.blue]}
          progressBackgroundColor={Colors.transparent}
        />
      }>
      {pendingChallenges &&
        pendingChallenges.length > 0 &&
        renderPendingChallenges(props, pendingChallenges, user_id ? user_id : '')}
      {ongoingChallenges &&
        ongoingChallenges.length > 0 &&
        renderOngoingChallenges(props, ongoingChallenges, user_id ? user_id : '')}
      {user_id && (
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={{ ...Typography.headerText }}>Want a new challenge?</Text>
            <Text style={{ ...Typography.bodyText }}>Create a challenge for you and your friends!</Text>
          </View>
          <Button style={styles.challengeButton} onPress={() => props.navigation.navigate('NewChallenge')}>
            Create new challenge
          </Button>
        </View>
      )}
    </ScrollView>
  );
};

const renderPendingChallenges = ({ navigation }: ChallengesProps, pendingChallenges: Challenge[], user_id: string) => {
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
        <Button
          style={styles.challengeButton}
          onPress={() => navigation.push('PendingChallenges', { user_id, pendingChallenges })}>
          View all
        </Button>
      )}
    </View>
  );
};

const renderOngoingChallenges = ({ navigation }: ChallengesProps, ongoingChallenges: Challenge[], user_id: string) => {
  return (
    <View style={styles.box}>
      <View style={styles.boxTitle}>
        <Text style={{ ...Typography.headerText }}>Ongoing Challenges</Text>
      </View>
      {ongoingChallenges.slice(0, PREVIEW_SIZE).map((item, index) => (
        <View key={index} style={styles.previewContainer}>
          <OngoingChallengeCard challenge={item} />
        </View>
      ))}
      {ongoingChallenges.length > PREVIEW_SIZE && (
        <Button
          style={styles.challengeButton}
          onPress={() => navigation.push('OngoingChallenges', { user_id, ongoingChallenges })}>
          View all
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: Spacing.base,
  },
  scrollContentContainer: {
    paddingTop: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Spacing.base,
  },
  previewContainer: {
    width: '100%',
    marginVertical: Spacing.smaller,
  },
  errorContainer: {
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
    marginVertical: Spacing.smaller,
  },
  boxTitle: {
    marginBottom: Spacing.base,
  },
  challengeButton: {
    backgroundColor: Colors.green,
    marginVertical: Spacing.base,
  },
});

export default ChallengeScreen;
