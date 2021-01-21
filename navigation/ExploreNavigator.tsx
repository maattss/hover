import React from 'react';
import { ExploreStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from '../screens/explore/MapScreen';

const ExploreStack = createStackNavigator<ExploreStackParamList>();

const ExploreNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Explore" component={MapScreen} />
    </ExploreStack.Navigator>
  );
};

export default ExploreNavigator;
