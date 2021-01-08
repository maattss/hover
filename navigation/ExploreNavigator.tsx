import React from 'react';
import { ExploreStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/explore/MapScreen';

const ExploreStack = createStackNavigator<ExploreStackParamList>();

const ExploreNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Map" component={MapScreen} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;
