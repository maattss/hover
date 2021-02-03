import React from 'react';
import { ChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from '../screens/challenge/ChallengeScreen';
import PendingChallengesScreen from '../screens/challenge/PendingChallengesScreen';
import { HeaderIcon } from './FeedNavigator';
import NewChallengeScreen from '../screens/challenge/NewChallengeScreen';
import OngoingChallengesScreen from '../screens/challenge/OngoingChallengesScreen';

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
          headerRight: () => <HeaderIcon name="plus" onPress={() => navigation.navigate('NewChallenge')} />,
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
        name="OngoingChallenges"
        component={OngoingChallengesScreen}
        options={() => ({
          headerTitle: 'Your challenges',
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
