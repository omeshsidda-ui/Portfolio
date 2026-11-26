import { useEffect, useState } from 'react';

export default function IndiaTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <span className="time-display" aria-label={time ? `India time ${time}` : 'India time'}>
      {time ? `${time} IST` : 'IST'}
    </span>
  );
}
