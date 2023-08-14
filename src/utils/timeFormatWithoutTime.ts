export const timeFormatWithoutTime = (timeString: string): string => {
  // UTC 시간을 파싱합니다.
  const timeDate = new Date(timeString + 'Z');

  // 현재의 해를 얻습니다.
  const currentYear = new Date().getFullYear();

  // 포맷을 "2023.8.4 11:43" 형식 또는 "8.4 11:43" 형식으로 맞춰줍니다.
  const year = timeDate.getFullYear();
  const month = timeDate.getMonth() + 1; // 월은 0부터 시작하기 때문에 1을 추가
  const day = timeDate.getDate();

  if (year === currentYear) {
    return `${month}월 ${day}일`;
  } else {
    return `${year}년 ${month}월 ${day}일`;
  }
};
