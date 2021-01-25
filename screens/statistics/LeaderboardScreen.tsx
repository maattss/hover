import React, { useEffect, useState } from 'react';
import Leaderboard, { Item } from '../../components/Leaderboard';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { HighscoreQueryVariables, useHighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { Spacing, Typography } from '../../theme';
import { convertToHighscoreList, mapCategories } from '../../helpers/objectMappers';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useCategoriesQuery } from '../../graphql/queries/Categories.generated';
import { Picker } from '@react-native-picker/picker';
import { PickerItemProps } from '@react-native-picker/picker/typings/Picker';

const LeaderboardScreen: React.FC = () => {
  const [category, setCategory] = useState<string | number>();
  const [timespan, setTimespan] = useState();
  const { data: categoryData, loading: categoryLoading, error: categoryError } = useCategoriesQuery();
  const { data: highscoreData, loading: highscoreLoading, error: highscoreError, refetch } = useHighscoreQuery({
    variables: { category, timespan } as HighscoreQueryVariables,
  });
  const [highscores, setHighscores] = useState<Item[]>([]);
  const [allCategories, setAllCategories] = useState<PickerItemProps[]>();
  useEffect(() => {
    if (highscoreData) {
      setHighscores(convertToHighscoreList(highscoreData));
    }
    if (categoryData) {
      setAllCategories(mapCategories(categoryData));
    }
    console.log('categoryData', categoryData);
  }, [highscoreData, categoryData]);

  if (categoryLoading || highscoreLoading) return <ActivityIndicator size={'large'} color={Colors.blue} />;
  if (categoryError) return <Text style={styles.infoText}>{categoryError.message}</Text>;
  if (highscoreError) return <Text style={styles.infoText}>{highscoreError.message}</Text>;

  return (
    <View style={styles.container}>
      <Picker style={{ backgroundColor: Colors.red, width: 150 }} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item color="white" label="All Categories" value={'null'} />
        {allCategories && allCategories.forEach((item) => <Picker.Item {...item} />)}
      </Picker>
      {highscores && <Leaderboard data={highscores} refetch={refetch} />}
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
