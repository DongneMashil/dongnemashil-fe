const timeAgo = (timeString: string): string => {
  const now = new Date();

  const utcTimeDate = new Date(timeString + 'Z'); //Z를 끝에 붙이면 UTC 시간으로 인식함
  const secondsDiff = (now.getTime() - utcTimeDate.getTime()) / 1000;
  const minutesDiff = secondsDiff / 60;
  const hoursDiff = minutesDiff / 60;
  const daysDiff = hoursDiff / 24;
  let displayTime: string;

  if (secondsDiff < 20) {
    displayTime = `방금 전`;
  } else if (secondsDiff < 60) {
    displayTime = `${Math.round(secondsDiff)}초 전`;
  } else if (minutesDiff < 60) {
    displayTime = `${Math.round(minutesDiff)}분 전`;
  } else if (hoursDiff < 12) {
    displayTime = `${Math.round(hoursDiff)}시간 전`;
  } else if (daysDiff < 15) {
    displayTime = `${Math.round(daysDiff)}일 전`;
  } else if (now.getFullYear() === utcTimeDate.getFullYear()) {
    displayTime = `${String(utcTimeDate.getMonth() + 1).padStart(
      2,
      '0'
    )}월${String(utcTimeDate.getDate()).padStart(2, '0')}일`;
  } else {
    displayTime = `${utcTimeDate.getFullYear()}년${String(
      utcTimeDate.getMonth() + 1
    ).padStart(2, '0')}월${String(utcTimeDate.getDate()).padStart(2, '0')}일`;
  }

  return displayTime;
};

export default timeAgo;

// // 사용 예
// const timeFromServer: string = '2023-08-08T22:35:53.214581';
// console.log(timeAgo(timeFromServer));
