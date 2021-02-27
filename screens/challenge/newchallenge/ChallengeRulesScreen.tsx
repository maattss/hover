import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Alert, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button, { CategoryButton } from '../../../components/general/Button';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { ChallengeRules } from '../../../types/challengeTypes';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import moment from 'moment';
import { GeoFenceCategory } from '../../../types/geoFenceTypes';
import { getChallengeTypeFields, getChallengeIcon } from '../../../helpers/challengeMappers';
import { generateRuleChallengeDescription } from '../../../helpers/decriptionHelper';
import KeyboardAvoider from '../../../components/keyboard/KeyboardAvoider';

type ChallengeRulesRouteProp = RouteProp<NewChallengeStackParamList, 'ChallengeRules'>;
type NavigationProp = StackNavigationProp<NewChallengeStackParamList>;

type Props = {
  navigation: NavigationProp;
  route: ChallengeRulesRouteProp;
};

const ChallengeRulesScreen: React.FC<Props> = ({ route, navigation }: Props) => {
  const [rules, setRules] = useState<ChallengeRules>({});
  const [score, setScore] = useState<number>();
  const [category, setCategory] = useState<GeoFenceCategory>();
  const [hours, setHours] = useState<number>();
  const [endDate, setEndDate] = useState<Date>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const fields = getChallengeTypeFields(route.params.challenge_type);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const goNext = () => {
    if (isDisabled) {
      Alert.alert('You are not finished', 'Fill out all fields to proceed!');
      return;
    }

    navigation.push('NewChallengeOverview', {
      ...route.params,
      rules: rules,
      end_date: endDate?.toISOString() ?? new Date().toISOString(),
    });
  };

  const validateRule = () => {
    if (fields.every((key) => rules[key.toLowerCase() as keyof ChallengeRules]) && endDate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleConfirm = (date: Date) => {
    setEndDate(date);
    hideDatePicker();
  };

  const parseNumber = (val: string): number => {
    if (isNaN(parseInt(val))) return 0;
    return parseInt(val);
  };

  useEffect(() => {
    setRules({
      category: category,
      score: score,
      time: hours,
    });
    validateRule();
  }, [score, category, hours, endDate]);

  const renderCategories = () => {
    return Object.keys(GeoFenceCategory).map((cat, index) => {
      const categoryEnum: GeoFenceCategory = GeoFenceCategory[cat as keyof typeof GeoFenceCategory];
      return (
        <CategoryButton
          key={index}
          category={categoryEnum}
          isSelected={category == categoryEnum}
          onPress={() => {
            setCategory(categoryEnum);
          }}
        />
      );
    });
  };

  const renderFields = () =>
    fields.map((field, index) => {
      switch (field) {
        case 'SCORE':
          return (
            <View key={index} style={styles.section}>
              <Text style={styles.label}>Goal score</Text>
              <TextInput
                placeholder="Enter your goal score"
                placeholderTextColor={Colors.gray600}
                onChangeText={(val) => setScore(parseNumber(val))}
                value={score?.toString()}
                keyboardType="numeric"
                style={styles.formField}
              />
            </View>
          );
        case 'CATEGORY':
          return (
            <View key={index} style={styles.section}>
              <Text style={styles.label}>Pick a category</Text>
              <View style={styles.categoryButtonsContainer}>{renderCategories()}</View>
            </View>
          );
        case 'TIME':
          return (
            <View key={index} style={styles.section}>
              <Text style={styles.label}>Hours</Text>
              <TextInput
                placeholder="Enter number of hours"
                placeholderTextColor={Colors.gray600}
                onChangeText={(val) => setHours(parseNumber(val))}
                value={hours?.toString()}
                keyboardType="numeric"
                style={styles.formField}
              />
            </View>
          );
        default:
          return (
            <Text key={index} style={styles.label}>
              Invalid field: {field}
            </Text>
          );
      }
    });

  return (
    <View>
      <ScrollView>
        <KeyboardAvoider>
          <View style={styles.container}>
            <Text style={styles.title}>Define challenge details</Text>
            <View style={styles.infoContainer}>
              <Text style={styles.descriptionText}>{generateRuleChallengeDescription(fields, rules, endDate)}</Text>
              <Image source={{ uri: getChallengeIcon() }} style={styles.challengeIcon} />
            </View>

            <View>{renderFields()}</View>

            <View style={styles.section}>
              <Text style={styles.label}>Choose last day in the challenge</Text>
              <Button
                style={styles.formField}
                textStyle={endDate ? { fontWeight: 'normal' } : { fontWeight: 'normal', color: Colors.gray700 }}
                onPress={showDatePicker}>
                {endDate ? moment(endDate).format('DD. MMM YYYY') : 'Choose a date'}
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                minimumDate={new Date()}
                onDateChange={(date) => setEndDate(date)}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          </View>
        </KeyboardAvoider>
      </ScrollView>
      <View style={styles.stickyFooter}>
        <Button onPress={goNext} style={isDisabled ? { backgroundColor: Colors.gray600 } : {}}>
          Next
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: Spacing.smaller,
  },
  title: {
    padding: Spacing.large,
    ...Typography.headerText,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.smaller,
    paddingHorizontal: Spacing.smallest,
    width: '100%',
  },
  descriptionText: {
    ...Typography.bodyText,
    fontStyle: 'italic',
  },
  challengeIcon: {
    width: 75,
    height: 75,
    marginTop: Spacing.smallest,
  },
  section: {
    paddingVertical: Spacing.smaller,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
  },
  formField: {
    ...Buttons.button,
    ...Typography.largeBodyText,
    fontWeight: 'normal',
    textAlign: 'center',
    padding: Spacing.base,
    marginBottom: Spacing.smaller,
    backgroundColor: Colors.gray900,
    width: '100%',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stickyFooter: {
    width: '100%',
    paddingHorizontal: Spacing.smaller,
    paddingVertical: Spacing.smaller,
    position: 'absolute',
    bottom: 0,
  },
});

export default ChallengeRulesScreen;
