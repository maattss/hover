export const durationToTimestamp = (duration: number) => {
  const final_duration = new Date(0);
  final_duration.setSeconds(duration);
  return final_duration.toISOString().substr(11, 8);
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString().substr(11, 8);
};
