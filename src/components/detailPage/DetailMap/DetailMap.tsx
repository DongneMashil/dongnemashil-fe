import { useEffect } from 'react';
import React from 'react';
import Marker from 'assets/icons/Marker.svg';

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
  x: string;
  y: string;
  address: Address;
  road_address: RoadAddress;
}

type KakaoSearchStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';
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
          const svgMarkerImageSrc = Marker;
          const markerSize = new kakao.maps.Size(36, 48);
          const markerImage = new kakao.maps.MarkerImage(
            svgMarkerImageSrc,
            markerSize
          );
          new kakao.maps.Marker({
            position: coords,
            map: map, // 이렇게 지정하면 지도 위에 바로 마커가 나타납니다.
            image: markerImage,
          });
          map.setCenter(coords);
        } else {
          console.error('Failed to get coordinates from the address.');
        }
      }
    );
  };

  const displayCurrentLocation = (map: kakao.maps.Map) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakao.maps.LatLng(lat, lon);

          // 빨간 점을 표시하는 CustomOverlay 생성
          const customOverlay = new kakao.maps.CustomOverlay({
            position: locPosition,
            content: `
            <div style="
              width:10px;
              height:10px;
              border-radius:50%;
              background:#FF0000;
              animation: blink 1s infinite;
            ">
            </div>
            <style>
              @keyframes blink {
                0% { opacity: 1; }
                50% { opacity: 0; }
                100% { opacity: 1; }
              }
            </style>
          `,
          });

          customOverlay.setMap(map);
          map.setCenter(locPosition); // 현재 위치를 중심으로 지도 이동
        },
        (error) => {
          console.error('Geolocation failed: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
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
    displayCurrentLocation(map);
  }, []);

  return <div id="map" style={{ width, height }}></div>;
};
