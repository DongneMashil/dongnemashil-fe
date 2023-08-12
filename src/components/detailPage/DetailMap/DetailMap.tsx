// Map.tsx

import { useEffect } from 'react';
import React from 'react';
interface DetailMapProps {
  width: string;
  height: string;
  initMap: (
    map: kakao.maps.Map,
    setMapCenterByAddress: (address: string, map: kakao.maps.Map) => void
  ) => void;
}
interface Address {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  region_3depth_h_name: string;
  h_code: string;
  b_code: string;
  mountain_yn: string;
  main_address_no: string;
  sub_address_no: string;
  x: string;
  y: string;
}

interface RoadAddress {
  address_name: string;
  region_1depth_name: string;
  region_2depth_name: string;
  region_3depth_name: string;
  road_name: string;
  underground_yn: string;
  main_building_no: string;
  sub_building_no: string;
  building_name: string;
  zone_no: string;
  x: string;
  y: string;
}
interface KakaoSearchResult {
  address_name: string;
  address_type: 'REGION' | 'ROAD' | 'REGION_ADDR' | 'ROAD_ADDR';
  x: string; // 'x'와 'y'의 타입이 문자열이라고 에러 메시지에 명시되어 있습니다.
  y: string;
  address: Address;
  road_address: RoadAddress;
}

type KakaoSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR'; // 카카오 맵 API의 응답 상태에 따라 이 값을 조절할 수 있습니다.
export const DetailMap = ({ width, height, initMap }: DetailMapProps) => {
  const setMapCenterByAddress = async (
    address: string,
    map: kakao.maps.Map
  ) => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      address,
      function (result: KakaoSearchResult[], status: KakaoSearchStatus) {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            parseFloat(result[0].y),
            parseFloat(result[0].x)
          );
          new kakao.maps.Marker({
            position: coords,
            map: map, // 이렇게 지정하면 지도 위에 바로 마커가 나타납니다.
          });
          map.setCenter(coords);
        } else {
          console.error('Failed to get coordinates from the address.');
        }
      }
    );
  };

  useEffect(() => {
    const container = document.getElementById('map');
    if (!container) return;

    const options = {
      center: new kakao.maps.LatLng(37.545043, 127.039245),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    if (initMap) {
      initMap(map, setMapCenterByAddress);
    }
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};

//   // 사용하는 곳
//   const YourComponent = () => {
//     const data = {
//       address: "서울특별시 종로구 사직로 161",  // 예시 주소
//     };

//     return (
//       <CommonLayout backgroundColor="#FFF">
//         <Map
//           height='100%'
//           width='100%'
//           initMap={(map, setMapCenterByAddress) => {
//             setMapCenterByAddress(data.address, map);
//           }}
//         />
//       </CommonLayout>
//     );
//   };
