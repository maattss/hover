import React from 'react';
import { NewChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import useAuthentication from '../hooks/useAuthentication';
import NewChallengeOverviewScreen from '../screens/challenge/newchallenge/NewChallengeOverviewScreen';
import PickUsersScreen from '../screens/challenge/newchallenge/PickUsersScreen';
import ChallengeRulesScreen from '../screens/challenge/newchallenge/ChallengeRulesScreen';
import ChallengeTypeScreen from '../screens/challenge/newchallenge/ChallengeTypeScreen';

const NewChallengeStack = createStackNavigator<NewChallengeStackParamList>();

const NewChallengeNavigator: React.FC = () => {
  const user_id = useAuthentication().user?.uid ?? '';
  return (
    <NewChallengeStack.Navigator>
      <NewChallengeStack.Screen
        name="PickUsers"
        component={PickUsersScreen}
        options={() => ({
          headerTitle: 'Pick Users',
        })}
        initialParams={{ user_id: user_id }}
      />
      <NewChallengeStack.Screen
        name="ChallengeType"
        component={ChallengeTypeScreen}
        options={() => ({
          headerTitle: 'Challenge type',
        })}
      />
      <NewChallengeStack.Screen
        name="ChallengeRules"
        component={ChallengeRulesScreen}
        options={() => ({
          headerTitle: 'Define Rules',
        })}
      />
      <NewChallengeStack.Screen
        name="NewChallengeOverview"
        component={NewChallengeOverviewScreen}
        options={() => ({
          headerTitle: 'Create challenge',
        })}
      />
    </NewChallengeStack.Navigator>
  );
};

export default NewChallengeNavigator;