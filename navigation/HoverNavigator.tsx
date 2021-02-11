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
  console.log('TrackingState: ' + tracking.trackingState.toString());
  console.log('TrackingState: ' + (tracking.trackingState === TrackingState.EXPLORE));
  return (
    <ExploreStack.Navigator screenOptions={{ headerShown: false }}>
      {tracking.trackingState === TrackingState.EXPLORE && (
        <ExploreStack.Screen name="Explore" component={ExploreScreen} />
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
