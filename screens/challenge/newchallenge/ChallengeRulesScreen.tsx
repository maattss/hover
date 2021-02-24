import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
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
import { getChallengeTypeFields } from '../../../helpers/challengeMappers';
import Divider from '../../../components/general/Divider';
import { generateRuleChallengeDescription } from '../../../helpers/decriptionHelper';
import KeyboardAvoider from '../../../components/general/KeyboardAvoider';

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
  const fields = getChallengeTypeFields(route.params.challenge_type);
  const [isDisabled, setDisabled] = useState(true);
  const validateRule = () => {
    if (fields.every((key) => rules[key.toLowerCase() as keyof ChallengeRules]) && endDate) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: Date) => {
    setEndDate(date);
    hideDatePicker();
  };

  const parseNumber = (val: string): number => {
    if (isNaN(parseInt(val))) {
      return 0;
    }
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

  return (
    <KeyboardAvoider>
      <View style={styles.container}>
        <View style={styles.box}>
          <Text style={{ ...Typography.headerText }}>Define challenge details</Text>
          <Text style={styles.descriptionText}>{generateRuleChallengeDescription(fields, rules, endDate)}</Text>
          <Divider />
          <View>
            {fields.map((field, index) => {
              if (field == 'SCORE') {
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
              } else if (field == 'CATEGORY') {
                return (
                  <View key={index} style={styles.section}>
                    <Text style={styles.label}>Pick a category</Text>
                    <View style={styles.categoryButtonsContainer}>{renderCategories()}</View>
                  </View>
                );
              } else if (field == 'TIME') {
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
              } else {
                return (
                  <Text key={index} style={styles.label}>
                    Invalid field: {field}
                  </Text>
                );
              }
            })}
          </View>
          <View style={styles.section}>
            <Text style={styles.label}>Last day of challenge?</Text>
            <Button style={styles.formField} onPress={showDatePicker}>
              {moment(endDate).format('DD. MMM YYYY')}
            </Button>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>

        <Button
          onPress={() =>
            isDisabled
              ? Alert.alert('You are not finished', 'Fill out all fields to proceed!', [{ text: 'OK' }])
              : navigation.push('NewChallengeOverview', {
                  ...route.params,
                  rules: rules,
                  end_date: endDate?.toISOString() ?? new Date().toISOString(),
                })
          }
          style={isDisabled ? { backgroundColor: Colors.gray600 } : {}}>
          Next
        </Button>
      </View>
    </KeyboardAvoider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
    marginHorizontal: Spacing.smaller,
    marginVertical: Spacing.smaller,
  },
  descriptionText: {
    ...Typography.bodyText,
    fontStyle: 'italic',
    paddingVertical: Spacing.small,
  },
  section: {
    paddingVertical: Spacing.small,
  },
  label: {
    ...Typography.bodyText,
    fontWeight: 'bold',
    marginBottom: Spacing.smallest,
    textAlign: 'left',
  },
  formField: {
    ...Buttons.button,
    ...Typography.bodyText,
    padding: Spacing.base,
    marginBottom: Spacing.smaller,
    backgroundColor: Colors.gray800,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default ChallengeRulesScreen;
