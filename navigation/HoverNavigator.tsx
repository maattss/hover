import React from 'react';
import { HoverStackParamList } from '../types/navigationTypes';
import { createStackNavigator } from '@react-navigation/stack';
import TrackingScreen from '../screens/hover/TrackingScreen';
import ExploreScreen from '../screens/hover/ExploreScreen';
import PublishScreen from '../screens/hover/PublishScreen';
import useTracking from '../hooks/useTracking';
import { TrackingState } from '../components/providers/TrackingProvider';

const ExploreStack = createStackNavigator<HoverStackParamList>();

const HoverNavigator: React.FC = () => {
  const tracking = useTracking();
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      {tracking.trackingState === TrackingState.EXPLORE && (
        // TODO: Change to explore screen. Tracking screen only for testing.
        <ExploreStack.Screen name="Tracking" component={TrackingScreen} />
      )}
      {tracking.trackingState === TrackingState.TRACKING && (
        <ExploreStack.Screen name="Tracking" component={TrackingScreen} />
      )}
      {tracking.trackingState === TrackingState.PUBLISH && (
        <ExploreStack.Screen name="Publish" component={PublishScreen} />
      )}
    </ExploreStack.Navigator>
  );
};

export default HoverNavigator;
