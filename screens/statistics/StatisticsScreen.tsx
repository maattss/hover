import React from 'react';
import tailwind from 'tailwind-rn';
import { View } from '../../components/Themed';
import StatisticsTopBar from '../../navigation/StatisticsTopBar';

const TabThreeScreen = () => {
  return (
    <View style={tailwind('flex-1')}>
      <StatisticsTopBar />
    </View>
  );
};

export default TabThreeScreen;
