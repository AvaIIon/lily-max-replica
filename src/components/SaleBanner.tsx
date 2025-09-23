import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const SaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 1,
    hours: 6,
    minutes: 58,
    seconds: 38
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-sale-green text-white py-3 px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-sale-green via-sale-green to-green-600"></div>
      <div className="relative z-10 flex items-center justify-center space-x-2 text-sm font-medium">
        <span>🎉 BIGGEST SALE OF THE YEAR! Save up to 40% on all bunk beds & loft beds |</span>
        <div className="flex items-center space-x-1">
          <span>{timeLeft.days}day :</span>
          <span>{timeLeft.hours}hrs :</span>
          <span>{timeLeft.minutes}mins :</span>
          <span>{timeLeft.seconds}secs</span>
        </div>
        <span>| FREE SHIPPING over $299 | Call: 416-919-4434</span>
      </div>
    </div>
  );
};