import React from 'react';
import tailwind from 'tailwind-rn';
import Leaderboard, { Item } from '../../../components/Leaderboard';

import { View } from '../../../components/Themed';

export default function LeaderboardScreen() {
  const data: Item[] = [
    {
      name: 'Siri',
      score: 923,
      icon: 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300',
    },
    {
      name: 'Mats',
      score: 263,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsSlzi6GEickw2Ft62IdJTfXWsDFrOIbwXhzddXXt4FvsbNGhp',
    },
    {
      name: 'Henrik',
      score: 523,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz',
    },
    {
      name: 'Jenny',
      score: 420,
      icon: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png',
    },
    {
      name: 'Hanne',
      score: null,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-',
    },
    {
      name: 'Adam',
      score: 12,
      icon: 'https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png',
    },
    { name: 'Derek Black', score: 244, icon: 'http://ttsbilisim.com/wp-content/uploads/2014/09/20120807.png' },
    {
      name: 'Ericka Johannesburg',
      score: 201,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShPis8NLdplTV1AJx40z-KS8zdgaSPaCfNINLtQ-ENdPvrtMWz',
    },
    {
      name: 'Tina Turner',
      score: 722,
      icon: 'https://cdn.dribbble.com/users/223408/screenshots/2134810/me-dribbble-size-001-001_1x.png',
    },
    {
      name: 'Harry Reynolds',
      score: null,
      icon: 'https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png',
    },
    {
      name: 'Betty Davis',
      score: 25,
      icon: 'https://landofblogging.files.wordpress.com/2014/01/bitstripavatarprofilepic.jpeg?w=300&h=300',
    },
    {
      name: 'Lauren Leonard',
      score: null,
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr27ZFBaclzKcxg2FgJh6xi3Z5-9vP_U1DPcB149bYXxlPKqv-',
    },
  ];
  return (
    <View style={tailwind('flex-1')}>
      <Leaderboard data={data} />
    </View>
  );
}
