/**
 * 두 위도와 경도 좌표 사이의 거리를 계산합니다.
 * @param lat1 첫 번째 좌표의 위도
 * @param lon1 첫 번째 좌표의 경도
 * @param lat2 두 번째 좌표의 위도
 * @param lon2 두 번째 좌표의 경도
 * @returns 두 좌표 사이의 거리 (소수점 첫째 자리까지, km 단위)
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // 지구의 반지름 (킬로미터)

  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) *
      Math.cos(degToRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;

  // 소숫점 셋째 자리까지 반올림
  return Math.round(distance * 1000) / 1000;
};

/**
 * 도(degree)를 라디안으로 변환합니다.
 * @param degree 변환할 도
 * @returns 변환된 라디안 값
 */
function degToRad(degree: number): number {
  return degree * (Math.PI / 180);
}

// // 예제
// const lat1 = 37.5665; // 예: 서울
// const lon1 = 126.978;
// const lat2 = 35.6895; // 예: 부산
// const lon2 = 129.4919;

// console.log(calculateDistance(lat1, lon1, lat2, lon2)); // 약 325.0 km (실제 거리와는 약간의 차이가 있을 수 있습니다.)
