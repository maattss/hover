import React from 'react';
import { TrackingContext } from '../components/TrackingProvider';

const useTracking = () => {
  const tracking = React.useContext(TrackingContext);
  return tracking;
};

export default useTracking;
