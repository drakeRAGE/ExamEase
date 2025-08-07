export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const calculateTimeRemaining = (endTime) => {
  const now = Date.now();
  const difference = endTime - now;
  return Math.max(0, Math.floor(difference / 1000));
};