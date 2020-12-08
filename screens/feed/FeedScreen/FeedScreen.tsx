import React from 'react';
import tailwind from 'tailwind-rn';

import { View } from '../../../components/Themed';
import FeedTopBar from '../../../navigation/FeedTopBar';

export default function TabOneScreen() {
  return (
    <View style={tailwind('flex-1')}>
      <FeedTopBar />
    </View>
  );
}
