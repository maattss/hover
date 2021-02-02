import React from 'react';
import { ChallengeStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import ChallengeScreen from '../screens/challenge/ChallengeScreen';

const ChallengeStack = createStackNavigator<ChallengeStackParamList>();

const ChallengeNavigator: React.FC = () => {
  return (
    <ChallengeStack.Navigator screenOptions={{ headerShown: false }}>
      <ChallengeStack.Screen name="Challenge" component={ChallengeScreen} />
    </ChallengeStack.Navigator>
  );
};

export default ChallengeNavigator;
