export const timeFormat = (timeString: string): string => {
  // UTC 시간을 파싱합니다.
  const timeDate = new Date(timeString);

  // 해당 시간을 서울 타임존 기준으로 변환합니다.
  const seoulDate = new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(timeDate);

  // 포맷을 "2023.8.4 11:43" 형식으로 맞춰줍니다.
  const [datePart, timePart] = seoulDate.split(' ');
  const [year, month, day] = datePart.split('.');
  return `${year}.${parseInt(month, 10)}.${parseInt(day, 10)} ${timePart}`;
};

//   // 사용 예
//   const timeFromServer: string = '2023-08-04T02:43:00Z';  // UTC 기준 시간
//   console.log(formatToSeoulTime(timeFromServer));  // 서울 타임존 기준으로 변환된 시간 출력
