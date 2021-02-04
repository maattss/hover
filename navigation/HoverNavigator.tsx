import React from 'react';
import { HoverStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import TrackingScreen from '../screens/hover/TrackingScreen';
import ExploreScreen from '../screens/hover/ExploreScreen';
import PublishScreen from '../screens/hover/PublishScreen';

const ExploreStack = createStackNavigator<HoverStackParamList>();

const HoverNavigator: React.FC = () => {
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      <ExploreStack.Screen name="Tracking" component={TrackingScreen} />
      <ExploreStack.Screen name="Explore" component={ExploreScreen} />
      <ExploreStack.Screen name="Publish" component={PublishScreen} />
    </ExploreStack.Navigator>
  );
};

export default HoverNavigator;
