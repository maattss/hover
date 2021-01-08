import React from 'react';
import { ExploreNavigationStackParamList } from '../types';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/explore/MapScreen';

const ExploreStack = createStackNavigator<ExploreNavigationStackParamList>();

const ExploreNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Map" component={MapScreen} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;
