import React from 'react';
import tailwind from 'tailwind-rn';
import { Text, View } from 'react-native';

const FollowingFeedScreen: React.FC = () => {
  return (
    <View style={tailwind('py-5 px-5 flex-1')}>
      <Text style={tailwind('text-4xl text-center font-bold')}>Followers&apos; Activites</Text>
    </View>
  );
};

export default FollowingFeedScreen;
