import moment from 'moment';

export const durationToTimestamp = (duration: number | undefined) => {
  const finalDuration = new Date(0);
  finalDuration.setSeconds(duration ?? 0);
  return finalDuration.toISOString().substr(11, 8);
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

export const timeStampToPresentable = (timestamp: string) => {
  return moment(timestamp).fromNow().toString();
};

export const timeStampToHours = (timestamp: number | undefined) => {
  if (!timestamp) {
    return moment(getCurrentTimestamp()).format('HH:mm');
  } else {
    return moment(timestamp).format('HH:mm:ss');
  }
};

export const toPrettyDate = (date: Date) => {
  const momentDate = moment(date);
  const duration = moment(date).startOf('day').diff(moment().endOf('day'), 'days');

  if (duration < 7) {
    return momentDate.format('dddd');
  } else if (duration < 30) {
    return momentDate.format('dddd, Do of MMMM');
  } else if (duration < 365) {
    return momentDate.format('Do of MMMM');
  } else {
    return momentDate.format('Do of MMM YYYY');
  }
};
