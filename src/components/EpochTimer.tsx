import { useState, useEffect } from 'react';

const EPOCH_SECONDS = 900; // 15 minutes

function getSecondsUntilNextEpoch(): number {
  const now = Math.floor(Date.now() / 1000);
  const elapsed = now % EPOCH_SECONDS;
  return EPOCH_SECONDS - elapsed;
}

function formatMmSs(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function EpochTimer() {
  const [seconds, setSeconds] = useState<number>(getSecondsUntilNextEpoch);

  useEffect(() => {
    const tick = () => {
      setSeconds(getSecondsUntilNextEpoch());
    };

    // Align to the next whole second
    const msUntilNextSecond = 1000 - (Date.now() % 1000);
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      tick();
      interval = setInterval(tick, 1000);
    }, msUntilNextSecond);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const urgency = seconds <= 60;

  return (
    <div className={`epoch-timer ${urgency ? 'epoch-timer--urgent' : ''}`}>
      <span className="epoch-timer__label">NEXT EPOCH IN</span>
      <span className="epoch-timer__value">{formatMmSs(seconds)}</span>
    </div>
  );
}
