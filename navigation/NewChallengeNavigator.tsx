import React from 'react';
import { NewChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import useAuthentication from '../hooks/useAuthentication';
import NewChallengeOverviewScreen from '../screens/challenge/newchallenge/NewChallengeOverviewScreen';
import PickUsersScreen from '../screens/challenge/newchallenge/PickUsersScreen';
import ChallengeRulesScreen from '../screens/challenge/newchallenge/ChallengeRulesScreen';
import ChallengeTypeScreen from '../screens/challenge/newchallenge/ChallengeTypeScreen';
import ChallengeInfoScreen from '../screens/challenge/newchallenge/ChallengeInfoScreen';
import { HeaderIcon } from './FeedNavigator';

const NewChallengeStack = createStackNavigator<NewChallengeStackParamList>();

const NewChallengeNavigator: React.FC = () => {
  const user_id = useAuthentication().user?.uid ?? '';
  return (
    <NewChallengeStack.Navigator>
      <NewChallengeStack.Screen
        name="PickUsers"
        component={PickUsersScreen}
        options={({ navigation }) => ({
          headerTitle: 'Pick Users',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="info" onPress={() => navigation.navigate('ChallengeInfo')} />,
        })}
        initialParams={{ user_id: user_id }}
      />
      <NewChallengeStack.Screen
        name="ChallengeType"
        component={ChallengeTypeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Challenge type',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="info" onPress={() => navigation.navigate('ChallengeInfo')} />,
        })}
      />
      <NewChallengeStack.Screen
        name="ChallengeRules"
        component={ChallengeRulesScreen}
        options={({ navigation }) => ({
          headerTitle: 'Define Rules',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="info" onPress={() => navigation.navigate('ChallengeInfo')} />,
        })}
      />
      <NewChallengeStack.Screen
        name="NewChallengeOverview"
        component={NewChallengeOverviewScreen}
        options={() => ({
          headerTitle: 'Create challenge',
        })}
      />
      <NewChallengeStack.Screen
        name="ChallengeInfo"
        component={ChallengeInfoScreen}
        options={() => ({
          headerTitle: 'Information',
        })}
      />
    </NewChallengeStack.Navigator>
  );
};

export default NewChallengeNavigator;
