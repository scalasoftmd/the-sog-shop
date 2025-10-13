import { useState, useEffect } from 'react';

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set target date (you can adjust this)
    const targetDate = new Date('2025-11-01T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-h-[70vh] bg-white relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/coming-soon-bg.jpg')",
          filter: 'brightness(0.4)'
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-4">
        {/* Countdown */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-8 text-black text-lg md:text-xl tracking-wider mb-4">
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-sm">DAYS</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm">HOURS</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm">MINUTES</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm">SECONDS</div>
            </div>
          </div>
        </div>

        {/* Main Title */}
        <div className="text-center mb-12">
          <h1 className="text-black text-6xl md:text-8xl font-bold tracking-wider mb-8">
            COMING SOON
          </h1>
        </div>
      </div>
    </div>
  );
}
