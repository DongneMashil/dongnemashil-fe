export const numberWithCommas = (number: number) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 3자리 숫자 그룹간 경계를 ,로 치환
};
