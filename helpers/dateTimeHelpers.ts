import moment from 'moment';

export const durationToTimestamp = (duration: number) => {
  const finalDuration = new Date(0);
  finalDuration.setSeconds(duration);
  return finalDuration.toISOString().substr(11, 8);
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
export const timeStampToPresentable = (timestamp: string) => {
  return moment(timestamp).fromNow().toString();
};

export const toPrettyDate = (date: Date) => {
  const a = moment(date);
  const duration = moment(date).startOf('day').diff(moment().endOf('day'), 'days');

  if (duration < 7) {
    return a.format('dddd');
  } else if (duration < 30) {
    return a.format('dddd, Do of MMMM');
  } else if (duration < 365) {
    return a.format('Do of MMMM');
  } else {
    return a.format('Do of MMM YYYY');
  }
};
