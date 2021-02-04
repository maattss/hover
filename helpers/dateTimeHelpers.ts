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
    return moment(getCurrentTimestamp()).format('HH:mm');
  } else {
    return moment(timestamp).format('HH:mm');
  }
};
export const fromSecondsToHours = (duration: number) => {
  return moment({}).seconds(duration).format('HH:mm:ss');
};
