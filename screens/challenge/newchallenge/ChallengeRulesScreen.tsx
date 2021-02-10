import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button, { CategoryButton } from '../../../components/Button';
import Separator from '../../../components/Separator';
import { Buttons, Colors, Spacing, Typography } from '../../../theme';
import { ChallengeRules } from '../../../types/challengeTypes';
import { NewChallengeStackParamList } from '../../../types/navigationTypes';
import moment from 'moment';
import { GeoFenceCategory } from '../../../types/geoFenceTypes';
import { getChallengeTypeFields } from '../../../helpers/challengeMappers';

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
    if (fields.every((key) => rules[key as keyof ChallengeRules]) && endDate) {
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
  const RuleField = ({ field }: { field: string }) => {
    switch (field) {
      case 'score':
        return (
          <View>
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
      case 'category':
        return (
          <View>
            <Text style={styles.label}>Pick a category</Text>
            <View style={styles.categoryButtonsContainer}>{renderCategories()}</View>
          </View>
        );
      case 'time':
        return (
          <View>
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
        break;
    }
    return <Text style={styles.label}>Invalid field: {field}</Text>;
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={64}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
              <View style={styles.box}>
                <Text style={{ ...Typography.headerText }}>What is the challenge?</Text>
                <Separator />
                <View>
                  {fields.map((field, index) => (
                    <RuleField key={index} field={field} />
                  ))}
                </View>
                <View style={styles.box}></View>
                <Separator />
                <Text style={{ ...Typography.headerText }}>Last day of challenge?</Text>
                <View>
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
                onPress={() => {
                  navigation.push('NewChallengeOverview', {
                    ...route.params,
                    rules: rules,
                    end_date: endDate?.toISOString() ?? new Date().toISOString(),
                  });
                }}
                disabled={isDisabled}>
                Save Rules
              </Button>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    flex: 1,
    padding: Spacing.base,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    backgroundColor: Colors.gray900,
    width: '100%',
    borderRadius: Spacing.smaller,
    padding: Spacing.base,
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
    marginBottom: Spacing.base,
    backgroundColor: Colors.gray800,
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default ChallengeRulesScreen;
