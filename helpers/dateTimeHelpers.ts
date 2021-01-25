export const durationToTimestamp = (duration: number) => {
  const finalDuration = new Date(0);
  finalDuration.setSeconds(duration);
  return finalDuration.toISOString().substr(11, 8);
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
