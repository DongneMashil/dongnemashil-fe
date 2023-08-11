const timeAgo = (timeString: string): string => {
  const now = new Date();

  // UTC 기준의 현재 시간과 입력된 시간을 가져옵니다.
  const utcNow = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds()
  );
  const timeDate = new Date(timeString);
  const utcTimeDate = Date.UTC(
    timeDate.getUTCFullYear(),
    timeDate.getUTCMonth(),
    timeDate.getUTCDate(),
    timeDate.getUTCHours(),
    timeDate.getUTCMinutes(),
    timeDate.getUTCSeconds()
  );

  const secondsDiff = (utcNow - utcTimeDate) / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = hoursDiff / 24;

  let displayTime: string;

  if (secondsDiff < 60) {
    displayTime = `${Math.round(secondsDiff)}초 전`;
  } else if (minutesDiff < 60) {
    displayTime = `${Math.round(minutesDiff)}분 전`;
  } else if (hoursDiff < 12) {
    displayTime = `${Math.round(hoursDiff)}시간 전`;
  } else if (daysDiff < 15) {
    displayTime = `${Math.round(daysDiff)}일 전`;
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

  return displayTime;
};

export default timeAgo;

// // 사용 예
// const timeFromServer: string = '2023-08-08T22:35:53.214581';
// console.log(timeAgo(timeFromServer));
