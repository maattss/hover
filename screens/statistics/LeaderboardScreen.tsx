import React, { useEffect, useState } from 'react';
import Leaderboard, { Item } from '../../components/Leaderboard';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { HighscoreQueryVariables, useHighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { Spacing, Typography } from '../../theme';
import { convertToHighscoreList } from '../../helpers/objectMappers';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const LeaderboardScreen: React.FC = () => {
  const { data: data, loading, error, refetch } = useHighscoreQuery({
    variables: {} as HighscoreQueryVariables,
  });
  const [highscores, setHighscores] = useState<Item[]>([]);

  useEffect(() => {
    if (data) {
      setHighscores(convertToHighscoreList(data));
    }
  }, [data]);

  if (loading) return <ActivityIndicator size={'large'} color={Colors.blue} />;
  if (error) return <Text style={styles.infoText}>{error.message}</Text>;

  return <View style={styles.container}>{highscores && <Leaderboard data={highscores} refetch={refetch} />}</View>;
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
