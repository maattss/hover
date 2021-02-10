import React, { useEffect, useState } from 'react';
import Leaderboard, { Item } from '../../components/leaderboard/Leaderboard';
import { StyleSheet, Text, View, TouchableOpacity, TextStyle, ViewStyle, Platform, Button } from 'react-native';
import { HighscoreQueryVariables, useHighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { convertToHighscoreList } from '../../helpers/objectMappers';
import { Picker } from '@react-native-picker/picker';
import { PickerItemProps } from '@react-native-picker/picker/typings/Picker';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import moment from 'moment';
import Loading from '../../components/general/Loading';

const STATIC_CATEGORIES: PickerItemProps[] = [
  { label: 'All Categories', value: '' },
  { label: 'Culture', value: 'CULTURE' },
  { label: 'Education', value: 'EDUCATION' },
  { label: 'Exercise', value: 'EXERCISE' },
  { label: 'Social', value: 'SOCIAL' },
];

const STATIC_TIMESPAN: PickerItemProps[] = [
  { label: 'All Time', value: '' },
  { label: 'Today', value: moment().utc().startOf('day').toISOString() },
  { label: 'Past 7 days', value: moment().utc().subtract(1, 'week').startOf('day').toISOString() },
  { label: 'Past 30 days', value: moment().utc().subtract(1, 'month').startOf('day').toISOString() },
];

const LeaderboardScreen: React.FC = () => {
  const [category, setCategory] = useState<number | string>('');
  const [editCategory, setEditCategory] = useState(false);
  const [timespan, setTimespan] = useState<number | string>('');
  const [editTimespan, setEditTimespan] = useState(false);

  const { data: highscoreData, loading: highscoreLoading, error: highscoreError, refetch } = useHighscoreQuery({
    variables: {
      category: category !== '' ? category : null,
      timespan: timespan !== '' ? timespan : null,
    } as HighscoreQueryVariables,
  });
  const [highscores, setHighscores] = useState<Item[]>([]);

  useEffect(() => {
    if (highscoreData) setHighscores(convertToHighscoreList(highscoreData));
  }, [highscoreData]);

  if (Platform.OS == 'android') {
    if (highscoreLoading) return <Loading />;
    if (highscoreError) return <Text style={styles.infoText}>{highscoreError.message}</Text>;
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {setCategory && (
            <FilterPickerAndriod
              items={STATIC_CATEGORIES}
              selectedValue={category}
              onValueChange={(value) => {
                setCategory(value);
                setEditCategory(false);
                refetch();
              }}
              closePicker={() => setEditCategory(false)}
            />
          )}
          {setTimespan && (
            <FilterPickerAndriod
              items={STATIC_TIMESPAN}
              selectedValue={timespan}
              onValueChange={(value) => {
                setTimespan(value);
                setEditTimespan(false);
                refetch();
              }}
              closePicker={() => setEditTimespan(false)}
            />
          )}
        </View>
        <View style={styles.leaderboardContainer}>{highscores && <Leaderboard data={highscores} />}</View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          {setCategory && (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setEditCategory(true);
                setEditTimespan(false);
              }}>
              <Text style={{ ...Buttons.buttonText }}>
                {STATIC_CATEGORIES.find((obj) => obj.value === category)?.label}
              </Text>
              <FAIcon name="filter" style={styles.filterIcon} />
            </TouchableOpacity>
          )}
          {setTimespan && (
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => {
                setEditTimespan(true);
                setEditCategory(false);
              }}>
              <Text style={{ ...Buttons.buttonText }}>
                {STATIC_TIMESPAN.find((obj) => obj.value === timespan)?.label}
              </Text>
              <FAIcon name="clock" style={styles.filterIcon} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.leaderboardContainer}>
          {!highscoreLoading && !highscoreError && highscores && <Leaderboard data={highscores} refetch={refetch} />}
        </View>

        {editCategory && !editTimespan && (
          <FilterPickerIos
            items={STATIC_CATEGORIES}
            selectedValue={category}
            onValueChange={(value) => {
              setCategory(value);
              refetch();
            }}
            closePicker={() => setEditCategory(false)}
          />
        )}
        {editTimespan && !editCategory && (
          <FilterPickerIos
            items={STATIC_TIMESPAN}
            selectedValue={timespan}
            onValueChange={(value) => {
              setTimespan(value);
              refetch();
            }}
            closePicker={() => setEditTimespan(false)}
          />
        )}
      </View>
    );
  }
};

export default LeaderboardScreen;

interface PickerProps {
  items: PickerItemProps[];
  selectedValue: number | string;
  onValueChange: (value: number | string) => void;
  closePicker: () => void;
}

const FilterPickerIos = ({ items, selectedValue, onValueChange, closePicker }: PickerProps) => {
  return (
    <View style={styles.pickerContainer}>
      <View style={styles.pickerButton}>
        <Button onPress={closePicker} title="Done" color={Colors.blue} />
      </View>

      <Picker
        mode="dropdown"
        prompt="Choose a filter"
        style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}>
        {items.map((item) => (
          <Picker.Item key={item.value} color={Colors.white} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const FilterPickerAndriod = ({ items, selectedValue, onValueChange }: PickerProps) => {
  return (
    <Picker
      mode="dropdown"
      prompt="Choose a filter"
      style={styles.picker}
      selectedValue={selectedValue}
      onValueChange={(itemValue) => onValueChange(itemValue)}>
      {items.map((item) => (
        <Picker.Item key={item.value} color={Colors.white} label={item.label} value={item.value} />
      ))}
    </Picker>
  );
};

interface StylesProps {
  container: ViewStyle;
  filterContainer: ViewStyle;
  leaderboardContainer: ViewStyle;
  pickerContainer: ViewStyle;
  refreshContainer: ViewStyle;
  infoText: TextStyle;
  picker: TextStyle;
  filterButton: ViewStyle;
  filterIcon: TextStyle;
  refreshButton: ViewStyle;
  pickerButton: ViewStyle;
  refreshIcon: ViewStyle;
}

const styles: StylesProps = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  filterContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leaderboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: '96%',
    marginBottom: Spacing.smaller,
    backgroundColor: Colors.almostBlack,
    borderRadius: Spacing.base,
    alignItems: 'flex-end',
  },
  picker: {
    width: '100%',
    backgroundColor: Colors.almostBlack,
    borderRadius: Spacing.base,
  },
  pickerButton: {
    padding: Spacing.smaller,
  },
  pickerContainerAndroid: {
    flex: 1,
    width: '100%',
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
  filterButton: {
    ...Buttons.button,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
  },
  filterIcon: {
    ...Buttons.buttonText,
    paddingLeft: Spacing.small,
  },
  refreshButton: {
    ...Buttons.button,
    backgroundColor: Colors.red,
    marginTop: Spacing.base,
    marginBottom: Spacing.base,
  },
  refreshIcon: {
    marginTop: Spacing.base,
  },
});
