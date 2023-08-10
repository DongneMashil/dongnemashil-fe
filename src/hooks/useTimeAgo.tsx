import { useState, useEffect } from 'react';

const useTimeAgo = (timeString: string): string => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    const timeDate = new Date(timeString);

    const secondsDiff = (now.getTime() - timeDate.getTime()) / 1000;
    const minutesDiff = secondsDiff / 60;
    const hoursDiff = minutesDiff / 60;
    const daysDiff = hoursDiff / 24;

    let displayTime: string;

    if (secondsDiff < 60) {
      displayTime = `${Math.round(secondsDiff)}초전`;
    } else if (minutesDiff < 60) {
      displayTime = `${Math.round(minutesDiff)}분전`;
    } else if (hoursDiff < 12) {
      displayTime = `${Math.round(hoursDiff)}시간전`;
    } else if (daysDiff < 15) {
      displayTime = `${Math.round(daysDiff)}일전`;
    } else if (now.getFullYear() === timeDate.getFullYear()) {
      displayTime = `${String(timeDate.getMonth() + 1).padStart(
        2,
        '0'
      )}월${String(timeDate.getDate()).padStart(2, '0')}일`;
    } else {
      displayTime = `${timeDate.getFullYear()}년${String(
        timeDate.getMonth() + 1
      ).padStart(2, '0')}월${String(timeDate.getDate()).padStart(2, '0')}일`;
    }

    setTimeAgo(displayTime);
  }, [timeString]);

  return timeAgo;
};

export default useTimeAgo;

/**
 * 사용예
 * import React from 'react';
import useTimeAgo from './useTimeAgo';

const YourComponent = () => {
    const timeFromServer = '2023-08-08T22:35:53.214581';
    const timeAgo = useTimeAgo(timeFromServer);

    return <div>{timeAgo}</div>;
}

 */
