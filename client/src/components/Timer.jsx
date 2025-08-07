import { useEffect } from 'react';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/timerUtils';

const Timer = ({ endTime, onTimeExpired }) => {
  const timeRemaining = useTimer(endTime, onTimeExpired);

  // Warning colors based on time remaining
  const getTimerColor = () => {
    if (timeRemaining <= 60) return 'text-red-600'; // Last minute
    if (timeRemaining <= 300) return 'text-orange-500'; // Last 5 minutes
    return 'text-blue-600';
  };

  return (
    <div className="text-center p-3 border rounded-md shadow-sm bg-white">
      <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
      <p className={`text-2xl font-bold ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </p>
    </div>
  );
};

export default Timer;