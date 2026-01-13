import { useState, useEffect, useCallback } from 'react';

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
  totalSeconds: number;
}

/**
 * Custom hook for countdown timer functionality
 * @param targetDate - Target date to count down to
 * @returns TimeRemaining object with days, hours, minutes, seconds, and completion status
 */
export function useCountdown(targetDate: Date): TimeRemaining {
  const calculateTimeRemaining = useCallback((): TimeRemaining => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const difference = target - now;

    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isComplete: true,
        totalSeconds: 0,
      };
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds,
      isComplete: false,
      totalSeconds,
    };
  }, [targetDate]);

  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(calculateTimeRemaining);

  useEffect(() => {
    // Update immediately
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      // Clear interval when countdown is complete
      if (remaining.isComplete) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeRemaining]);

  return timeRemaining;
}

export type { TimeRemaining };
