export default (duration) => {
  if (!duration) {
    return {
      time: undefined,
      units: 'ms',
    };
  }
  const hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);
  const minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  if (hours > 0) {
    return {
      time: `${hours}:${minutes}`,
      units: 'hrs',
    };
  }
  const seconds = parseInt((duration / 1000) % 60, 10);
  if (minutes > 0) {
    return {
      time: `${minutes}:${seconds}`,
      units: 'min',
    };
  }
  const milliseconds = parseInt((duration % 1000) / 100, 10);
  if (seconds > 0) {
    return {
      time: `${seconds}:${milliseconds}`,
      units: 'sec',
    };
  }
  return {
    time: `${milliseconds}`,
    units: 'ms',
  };
};
