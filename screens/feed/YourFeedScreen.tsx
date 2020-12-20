import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View } from 'react-native';

const YourFeedScreen: React.FC = () => {
  return (
    <View style={tailwind('py-5 px-5 flex-1')}>
      <Text style={tailwind('py-5 text-4xl text-center font-bold')}>Your Activities</Text>
    </View>
  );
};

export default YourFeedScreen;
