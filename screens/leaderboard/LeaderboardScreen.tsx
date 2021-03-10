import React, { useEffect, useState } from 'react';
import Leaderboard, { Item } from '../../components/leaderboard/Leaderboard';
import { StyleSheet, Text, View, TouchableOpacity, Platform, Button, ActivityIndicator } from 'react-native';
import { HighscoreQueryVariables, useHighscoreQuery } from '../../graphql/queries/Highscore.generated';
import { Buttons, Colors, Spacing, Typography } from '../../theme';
import { convertToHighscoreList } from '../../helpers/objectMappers';
import { Picker } from '@react-native-picker/picker';
import { PickerItemProps } from '@react-native-picker/picker/typings/Picker';
import { FontAwesome5 as FAIcon } from '@expo/vector-icons';
import moment from 'moment';
import Loading from '../../components/general/Loading';
import Divider from '../../components/general/Divider';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

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
      <View>
        <View style={styles.filterContainer}>
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
        </View>
        <View style={{ paddingBottom: insets.bottom + Spacing.smaller }}>
          {highscores && <Leaderboard data={highscores} />}
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
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

          <TouchableOpacity
            style={[styles.filterButton, { justifyContent: 'flex-end' }]}
            onPress={() => {
              setEditTimespan(true);
              setEditCategory(false);
            }}>
            <Text style={{ ...Buttons.buttonText }}>
              {STATIC_TIMESPAN.find((obj) => obj.value === timespan)?.label}
            </Text>
            <FAIcon name="clock" style={styles.filterIcon} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingBottom: insets.bottom + Spacing.smaller }}>
          {highscoreLoading && <ActivityIndicator size={'large'} color={Colors.blue} />}
          {highscoreError && <Text style={styles.infoText}>{highscoreError.message}</Text>}
          {!highscoreLoading && !highscoreError && highscores && <Leaderboard data={highscores} />}
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
    <View style={styles.pickerContainerIos}>
      <View style={styles.pickerButton}>
        <Button onPress={closePicker} title="Done" color={Colors.blue} />
      </View>

      <Picker
        mode="dropdown"
        prompt="Choose a filter"
        style={styles.pickerIos}
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
    <View style={styles.pickerContainerAndroid}>
      <Picker
        mode="dropdown"
        prompt="Choose a filter"
        style={styles.pickerAndroid}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}>
        {items.map((item) => (
          <Picker.Item key={item.value} color={Colors.almostBlack} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerContainerIos: {
    width: '96%',
    marginBottom: Spacing.smaller,
    backgroundColor: Colors.almostBlack,
    borderRadius: Spacing.base,
    alignItems: 'flex-end',
  },
  pickerIos: {
    width: '100%',
  },
  pickerAndroid: {
    width: '100%',
    backgroundColor: Colors.almostWhite,
  },
  pickerButton: {
    padding: Spacing.smaller,
  },
  pickerContainerAndroid: {
    flex: 1,
    width: '50%',
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
    width: '50%',
  },
  filterIcon: {
    ...Buttons.buttonText,
    paddingLeft: Spacing.small,
  },
});
