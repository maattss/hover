import React from 'react';
import { ChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from '../screens/challenge/ChallengeScreen';
import PendingChallengesScreen from '../screens/challenge/PendingChallengesScreen';
import { HeaderIcon } from './FeedNavigator';
import NewChallengeScreen from '../screens/challenge/NewChallengeScreen';

const ChallengeStack = createStackNavigator<ChallengeStackParamList>();

const ChallengeNavigator: React.FC = () => {
  return (
    <ChallengeStack.Navigator>
      <ChallengeStack.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Challenges',
          // eslint-disable-next-line react/display-name
          headerRight: () => <HeaderIcon name="users" onPress={() => navigation.navigate('Notifications')} />,
        })}
      />
      <ChallengeStack.Screen
        name="PendingChallenges"
        component={PendingChallengesScreen}
        options={() => ({
          headerTitle: 'Pending',
        })}
      />
      <ChallengeStack.Screen
        name="NewChallenge"
        component={NewChallengeScreen}
        options={() => ({
          headerTitle: 'Create challenge',
        })}
      />
    </ChallengeStack.Navigator>
  );
};

export default ChallengeNavigator;
