import React from 'react';
import { TrackingStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import TrackingScreen from '../screens/tracking/TrackingScreen';

const ExploreStack = createStackNavigator<TrackingStackParamList>();

const TrackingNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Hover" component={TrackingScreen} />
    </ExploreStack.Navigator>
  );
};

export default TrackingNavigator;
