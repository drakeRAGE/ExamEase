import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/timerUtils';

const Timer = ({ endTime, onTimeExpired }) => {
  const timeRemaining = useTimer(endTime, onTimeExpired);

  // Warning colors based on time remaining
  const getTimerColor = () => {
    if (timeRemaining <= 60) return 'text-red-400'; // Last minute
    if (timeRemaining <= 300) return 'text-orange-400'; // Last 5 minutes
    return 'text-indigo-400';
  };

  return (
    <div className="text-center p-4 border rounded-md bg-gray-900/70 border-gray-700/50 shadow-lg">
      <p className="text-sm text-gray-400 mb-1">Time Remaining</p>
      <p className={`text-2xl font-bold ${getTimerColor()}`}>
        {formatTime(timeRemaining)}
      </p>
    </div>
  );
};

export default Timer;