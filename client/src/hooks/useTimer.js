import { useState, useEffect, useCallback } from 'react';
import { calculateTimeRemaining } from '../utils/timerUtils';

export const useTimer = (endTime, onTimeExpired) => {
  const [timeRemaining, setTimeRemaining] = useState(
    endTime ? calculateTimeRemaining(endTime) : 0
  );

  const tick = useCallback(() => {
    if (!endTime) return;
    
    const remaining = calculateTimeRemaining(endTime);
    setTimeRemaining(remaining);
    
    if (remaining <= 0 && onTimeExpired) {
      onTimeExpired();
    }
  }, [endTime, onTimeExpired]);

  useEffect(() => {
    if (!endTime) return;
    
    // Initial calculation
    tick();
    
    // Set up interval
    const intervalId = setInterval(tick, 1000);
    
    // Cleanup
    return () => clearInterval(intervalId);
  }, [endTime, tick]);

  return timeRemaining;
};