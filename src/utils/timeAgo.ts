const timeAgo = (timeString: string): string => {
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

  return displayTime;
};

export default timeAgo;

// // 사용 예
// const timeFromServer: string = '2023-08-08T22:35:53.214581';
// console.log(timeAgo(timeFromServer));
