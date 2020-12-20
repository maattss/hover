import React from 'react';
import tailwind from 'tailwind-rn';
import { View } from 'react-native';
import FeedTopBar from '../../navigation/FeedTopBar';

const FeedScreen: React.FC = () => {
  return (
    <View style={tailwind('flex-1')}>
      <FeedTopBar />
    </View>
  );
};

export default FeedScreen;
