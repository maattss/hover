import React from 'react';
import { HoverStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import TrackingScreen from '../screens/hover/TrackingScreen';
import ExploreScreen from '../screens/hover/ExploreScreen';
import PublishScreen from '../screens/hover/PublishScreen';

const ExploreStack = createStackNavigator<HoverStackParamList>();

const HoverNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} options={} />
      <ExploreStack.Screen name="Tracking" component={TrackingScreen} />
      <ExploreStack.Screen name="Publish" component={PublishScreen} />
    </ExploreStack.Navigator>
  );
};

export default HoverNavigator;
