'use client';
import { Call } from '@stream-io/video-react-sdk';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useState, useEffect } from 'react';

const RealTimeClock = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [call, setCall] = useState< {
    id: string;
    startsAt: Date | undefined;
    description: any;
    creatorName: any;
} | null>(null);

  const client = useStreamVideoClient();

  // Update current time
  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch nearest upcoming call
  useEffect(() => {
    const getUpcomingCall = async () => {
      if (!client) return;

      const { calls } = await client.queryCalls({
        filter_conditions: {
          starts_at: { $gt: new Date().toISOString() },
        },
        sort: [{ field: 'starts_at', direction: 1 }],
        limit: 1,
        watch: true,
      });

      const upcoming = calls[0];
      if (upcoming) {
        const smallCall = {
          id: upcoming.id,
          startsAt: upcoming.state.startsAt,
          description: upcoming.state.custom?.description,
          creatorName: upcoming.state.createdBy?.name,
        };
        setCall(smallCall);
      }
    };

    getUpcomingCall();
  }, [client]);

  const currentTime = dateTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const currentDate = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(dateTime);

  // Read upcoming meeting start time from `call.state`
  const upcomingTime = call?.startsAt
    ? new Date(call.startsAt).toLocaleTimeString([], {
      hour: '2-digit',
      day: '2-digit',
      month: 'short',
      minute: '2-digit',
    })
    : 'No Meeting';

  return (
    <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
      <h2 className="glassmorphism max-w-[330px] rounded py-2 text-center text-base font-normal">
        Upcoming Meeting at: {upcomingTime}
      </h2>

      {call?.description && (
        <p className="text-sm text-gray-300 italic mt-1">
          {call.description}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold lg:text-7xl">{currentTime}</h1>
        <p className="text-lg font-medium text-sky-1 lg:text-2xl">{currentDate}</p>
      </div>
    </div>
  );
};

export default RealTimeClock;
