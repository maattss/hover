import React, { Dispatch, ReactText, SetStateAction, useEffect, useState } from 'react';
import Leaderboard, { Item } from '../../components/Leaderboard';
import { ActivityIndicator, StyleSheet, Text, View, TouchableOpacity, TextStyle, ViewStyle } from 'react-native';
import { HighscoreQueryVariables, useHighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { convertToHighscoreList } from '../../helpers/objectMappers';
import { Picker } from '@react-native-picker/picker';
import { PickerItemProps } from '@react-native-picker/picker/typings/Picker';

const STATIC_CATEGORIES = [
  { label: 'All Categories', value: '' },
  { label: 'Culture', value: 'CULTURE' },
  { label: 'Education', value: 'EDUCATION' },
  { label: 'Exercise', value: 'EXERCISE' },
  { label: 'Social', value: 'SOCIAL' },
];

const LeaderboardScreen: React.FC = () => {
  const [category, setCategory] = useState<number | string>('');
  const [editCategory, setEditCategory] = useState(false);

  const { data: highscoreData, loading: highscoreLoading, error: highscoreError, refetch } = useHighscoreQuery({
    variables: { category: category !== '' ? category : null } as HighscoreQueryVariables,
  });
  const [highscores, setHighscores] = useState<Item[]>([]);
  const [allCategories] = useState<PickerItemProps[]>(STATIC_CATEGORIES);

  useEffect(() => {
    if (highscoreData) {
      setHighscores(convertToHighscoreList(highscoreData));
    }
  }, [highscoreData]);

  if (highscoreLoading) return <ActivityIndicator size={'large'} color={Colors.blue} />;
  if (highscoreError) return <Text style={styles.infoText}>{highscoreError.message}</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        {setCategory && (
          <TouchableOpacity style={styles.categoryButton} onPress={() => setEditCategory(true)}>
            <Text style={{ ...Buttons.buttonText }}>{allCategories.find((obj) => obj.value === category)?.label}</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.leaderboardContainer}>
        {highscores && <Leaderboard data={highscores} refetch={refetch} />}
      </View>

      {editCategory && (
        <CategoryPicker
          items={allCategories}
          selectedValue={category}
          onValueChange={(value) => {
            setCategory(value);
            refetch();
            setEditCategory(false);
          }}
        />
      )}
    </View>
  );
};

export default LeaderboardScreen;

interface PickerProps {
  items: PickerItemProps[];
  selectedValue: number | string;
  onValueChange: (value: number | string) => void;
  setCategory?: Dispatch<SetStateAction<ReactText>>;
}

const CategoryPicker = ({ items, selectedValue, onValueChange }: PickerProps) => {
  return (
    <View style={styles.pickerContainer}>
      <Picker
        mode="dialog"
        style={[styles.infoText, { width: 150 }]}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}>
        {items.map((item) => (
          <Picker.Item key={item.value} color={Colors.white} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

interface StylesProps {
  container: ViewStyle;
  buttonsContainer: ViewStyle;
  leaderboardContainer: ViewStyle;
  pickerContainer: ViewStyle;
  refreshContainer: ViewStyle;
  infoText: TextStyle;
  picker: TextStyle;
  categoryButton: ViewStyle;
  refreshButton: ViewStyle;
}
const styles: StylesProps = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.red,
  },
  leaderboardContainer: {
    height: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    height: '20%',
    padding: Spacing.base,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  refreshContainer: {
    marginHorizontal: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  picker: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  pickerItem: {
    ...Typography.bodyText,
    paddingTop: Spacing.base,
  },
  categoryButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
  refreshButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
    width: '100%',
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
});
