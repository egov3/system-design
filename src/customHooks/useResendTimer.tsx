import { useEffect, useState } from "react";

import { MINUTE_SECONDS, SECOND_MS } from "~constants/time";

interface IResendTimerRes {
  formattedTime: string;
  isRunning: boolean;
}

const formatTimePart = (value: number) => String(value).padStart(2, "0");

export const useResendTimer = (availableAt: number): IResendTimerRes => {
  const [now, setNow] = useState(() => Date.now());

  const secondsLeft = Math.max(0, Math.ceil((availableAt - now) / SECOND_MS));
  const isRunning = secondsLeft > 0;

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const tick = () => {
      setNow(Date.now());
    };
    const syncId = setTimeout(tick);
    const timerId = setInterval(tick, SECOND_MS);
    return () => {
      clearTimeout(syncId);
      clearInterval(timerId);
    };
  }, [availableAt, isRunning]);

  return {
    formattedTime: `${formatTimePart(Math.floor(secondsLeft / MINUTE_SECONDS))}:${formatTimePart(secondsLeft % MINUTE_SECONDS)}`,
    isRunning,
  };
};
