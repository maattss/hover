import React from 'react';
import { ChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from '../screens/challenge/ChallengeScreen';
import PendingChallengesScreen from '../screens/challenge/PendingChallengesScreen';
import OngoingChallengesScreen from '../screens/challenge/OngoingChallengesScreen';
import NewChallengeNavigator from './NewChallengeNavigator';
import { HeaderIcon } from '../components/general/HeaderIcon';
import ProfileScreen from '../screens/profile/ProfileScreen';

const ChallengeStack = createStackNavigator<ChallengeStackParamList>();

const ChallengeNavigator: React.FC = () => {
  return (
    <ChallengeStack.Navigator>
      <ChallengeStack.Screen
        name="Challenge"
        component={ChallengeScreen}
        options={({ navigation }) => ({
          headerTitle: 'Challenge',
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
        component={NewChallengeNavigator}
        options={() => ({
          headerShown: false,
        })}
      />
      <ChallengeStack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={({ route }) => ({
          title: `${route.params.titleName}'s Profile`,
        })}
      />
    </ChallengeStack.Navigator>
  );
};

export default ChallengeNavigator;
