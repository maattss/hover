import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, RefreshControl, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
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
import Error from '../../components/general/Error';
import Loading from '../../components/general/Loading';
import { useIsFocused } from '@react-navigation/native';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';

type NavigationProp = StackNavigationProp<ChallengeStackParamList>;

export type ChallengesProps = {
  navigation: NavigationProp;
};

const PREVIEW_SIZE = 2;

const showPendingInfoPopup = () =>
  Alert.alert('Your pending invites', 'Accept the challenges to compete with other players.');
const showOngoingInfoPopup = () =>
  Alert.alert('Your ongoing challenges', 'All your current challenges and their status.');

const ChallengeScreen: React.FC<ChallengesProps> = (props: ChallengesProps) => {
  const user_id = useAuthentication().user?.uid;
  const [refreshing, setRefreshing] = useState(false);
  const [pendingChallenges, setPendingChallenges] = useState<Challenge[]>();
  const [ongoingChallenges, setOngoingChallenges] = useState<Challenge[]>();

  const { data, loading, error, refetch } = useGetChallengesQuery({
    variables: { user_id: user_id ? user_id : '', limit: PREVIEW_SIZE + 1 },
    nextFetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data && data.user) {
      const { pendingChallenges, ongoingChallenges } = convertChallenge(data);
      setPendingChallenges(pendingChallenges);
      setOngoingChallenges(ongoingChallenges);
    }
  }, [data]);

  const handleRefresh = useCallback(async () => {
    if (refetch) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      handleRefresh();
    }
  }, [isFocused]);

  const pendingChallengesExists = pendingChallenges && pendingChallenges.length > 0;
  const ongoingChallengesExists = ongoingChallenges && ongoingChallenges.length > 0;

  if (loading) return <Loading />;

  if (error) return <Error message={error.message} apolloError={error} />;

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
      {pendingChallengesExists &&
        renderPendingChallenges(props, pendingChallenges ? pendingChallenges : [], user_id ? user_id : '')}
      {ongoingChallengesExists &&
        renderOngoingChallenges(props, ongoingChallenges ? ongoingChallenges : [], user_id ? user_id : '')}
      {user_id && !pendingChallengesExists && !ongoingChallengesExists && (
        <View style={styles.box}>
          <View style={styles.boxTitle}>
            <Text style={{ ...Typography.headerText }}>Want a new challenge?</Text>
            <Text style={{ ...Typography.bodyText, padding: Spacing.smallest }}>
              Create a challenge for you and your friends!
            </Text>
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
        <Text style={{ ...Typography.headerText }}>Pending invites</Text>
        <TouchableOpacity onPress={showPendingInfoPopup}>
          <FAIcon name={'info-circle'} style={styles.iconSmall} />
        </TouchableOpacity>
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
        <Text style={{ ...Typography.headerText }}>Ongoing challenges</Text>
        <TouchableOpacity onPress={showOngoingInfoPopup}>
          <FAIcon name={'info-circle'} style={styles.iconSmall} />
        </TouchableOpacity>
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
    paddingHorizontal: Spacing.smaller,
  },
  scrollContentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '100%',
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
    width: '100%',
    flex: 1,
    alignItems: 'center',
    marginVertical: Spacing.smaller,
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.smaller,
    width: '100%',
  },
  challengeButton: {
    backgroundColor: Colors.green,
    marginVertical: Spacing.smallest,
  },
  iconSmall: {
    ...Typography.icon,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smallest,
  },
});

export default ChallengeScreen;
