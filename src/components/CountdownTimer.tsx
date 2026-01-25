import React from 'react';
import { useCountdown, TimeRemaining } from '../hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

interface TimeUnitProps {
  value: number;
  label: string;
  isLast?: boolean;
}

const TimeUnit: React.FC<TimeUnitProps> = ({ value, label, isLast = false }) => (
  <div className="flex flex-col items-center">
    <div className="time-unit-container">
      <span className="time-unit-value">
        {value.toString().padStart(2, '0')}
      </span>
    </div>
    <span className="time-unit-label">{label}</span>
    {!isLast && <span className="time-separator" aria-hidden="true" />}
  </div>
);

const TimeSeparator: React.FC = () => (
  <div className="time-colon" aria-hidden="true">:</div>
);

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  targetDate,
  className = '' 
}) => {
  const time: TimeRemaining = useCountdown(targetDate);

  if (time.isComplete) {
    return (
      <div className={`countdown-complete ${className}`}>
        <span className="launch-text">COMING SOON</span>
      </div>
    );
  }

  return (
    <div className={`countdown-timer ${className}`}>
      <div className="countdown-label">Launching In</div>
      <div className="countdown-display">
        <TimeUnit value={time.days} label="DAYS" />
        <TimeSeparator />
        <TimeUnit value={time.hours} label="HRS" />
        <TimeSeparator />
        <TimeUnit value={time.minutes} label="MINS" />
        <TimeSeparator />
        <TimeUnit value={time.seconds} label="SECS" isLast />
      </div>
    </div>
  );
};

export default CountdownTimer;
