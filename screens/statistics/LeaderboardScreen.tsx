import React, { useEffect, useState } from 'react';
import Leaderboard, { Item } from '../../components/Leaderboard';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { HighscoreQueryVariables, useHighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { Colors, Spacing, Typography } from '../../theme';
import { convertToHighscoreList } from '../../helpers/objectMappers';

const LeaderboardScreen: React.FC = () => {
  const { data: data, loading, error, refetch } = useHighscoreQuery({
    variables: {} as HighscoreQueryVariables,
    notifyOnNetworkStatusChange: true,
  });
  const [highscores, setHighscores] = useState<Item[]>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data.users);
      setHighscores(convertToHighscoreList(data));
    }
    console.log('setRefreshing(false);');
    setRefreshing(false);
  }, [data]);

  const refresh = async () => {
    setRefreshing(true);
    refetch();
  };

  if (loading || refreshing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator style={styles.loading} size={'large'} color={Colors.blue} />;
      </View>
    );
  }
  if (error) return <Text style={styles.infoText}>{error.message}</Text>;

  return (
    <View style={styles.container}>
      {highscores && <Leaderboard data={highscores} refreshing={refreshing} onRefresh={refresh} />}
    </View>
  );
};

export default LeaderboardScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    paddingBottom: '50%',
    flex: 1,
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  loading: {
    flex: 1,
    marginVertical: Spacing.smaller,
  },
});
