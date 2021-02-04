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
export const timeStampToHours = (timestamp: string) => {
  if (timestamp === '') {
    const current = getCurrentTimestamp();
    return moment(current).hours() + ':' + moment(current).minutes();
  } else {
    return moment(timestamp).hours() + ':' + moment(timestamp).minutes();
  }
};
