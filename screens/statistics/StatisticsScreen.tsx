import React from 'react';
import tailwind from 'tailwind-rn';
import { View } from 'react-native';
import StatisticsTopBar from '../../navigation/StatisticsTopBar';

const TabThreeScreen: React.FC = () => {
  return (
    <View style={tailwind('flex-1')}>
      <StatisticsTopBar />
    </View>
  );
};

export default TabThreeScreen;
