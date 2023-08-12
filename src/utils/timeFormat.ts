export const timeFormat = (timeString: string): string => {
  // UTC 시간을 파싱합니다.
  const timeDate = new Date(timeString + 'Z'); //Z를 끝에 붙이면 UTC 시간으로 인식함

  // 포맷을 "2023.8.4 11:43" 형식으로 맞춰줍니다.
  const year = timeDate.getFullYear();
  const month = timeDate.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 추가
  const day = timeDate.getDate();
  const hour = String(timeDate.getHours()).padStart(2, '0');
  const minute = String(timeDate.getMinutes()).padStart(2, '0');

  return `${year}.${month}.${day} ${hour}:${minute}`;
};

//   // 사용 예
//   const timeFromServer: string = '2023-08-04T02:43:00Z';  // UTC 기준 시간
//   console.log(formatToSeoulTime(timeFromServer));  // 사용자 기준으로 변환된 시간 출력 d d
