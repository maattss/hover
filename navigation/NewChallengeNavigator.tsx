import React from 'react';
import { NewChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import PickUsersScreen from '../screens/challenge/PickUsersScreen';
import NewChallengeOverviewScreen from '../screens/challenge/NewChallengeOverviewScreen';
import useAuthentication from '../hooks/useAuthentication';

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
